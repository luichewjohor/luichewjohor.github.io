import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'src/app/model/file-upload.model';
import { CommitteeService } from '../committee.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Committee } from 'src/app/model/committee.model';
import { Subscription, map, tap } from 'rxjs';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-committee-edit',
  templateUrl: './committee-edit.component.html',
  styleUrls: ['./committee-edit.component.css']
})
export class CommitteeEditComponent implements OnInit, OnDestroy {
  id: string;
  editMode = false;
  committeeForm: FormGroup;
  images: FileUpload[] = [];
  image: string = '';
  isDisabled: boolean = true;
  committee: Committee[] = [];
  user: User = null;
  subscription: Subscription;
  currentSeq: string;
  isLoading : boolean = false;

  constructor(private fb: FormBuilder, private committeeService: CommitteeService, private route: ActivatedRoute, private router: Router) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.committeeForm.reset;
  }

  ngOnInit(): void {
    this.currentSeq = '0';
    this.image = '';
    this.images = [];
    this.committee = [];
    this.editMode = false;
    this.isLoading = true;

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

  }

  private initForm() {
    this.committeeForm = this.fb.group({
      images: this.fb.array([]),
      header: new FormControl('', Validators.required),
      seq: '0',
      staffs: this.fb.array([this.newStaffGrp(0)])
    });

    let committee: Committee;
    this.images = [];
    if (this.editMode) {
      this.committeeService
        .getCommittee(this.id)
        .snapshotChanges()
        .pipe(
          tap((res) => console.debug(res)),
          map((d) => ({ key: d.payload.key, ...d.payload.val() }))
        )
        .subscribe((data) => {
          committee = data;
          this.updateForm(committee);
          // console.log(this.images);
        });
    } else {
      this.staffControls(0).push(this.newStaff());
    }
    this.subscription = this.committeeService.getAllCommittee()
      .subscribe(data => {
        this.committee = data;
        // this.user = this.authService.getCurrentUser();
        console.log(this.committee);
        if (!this.editMode) {
          this.committee.push({ key: '', header: '', images: [], seq: this.committee.length.toString(), staffs: [] });
          this.seq.setValue((this.committee.length -1).toString());
          this.currentSeq = (this.committee.length - 1).toString();
        }
      });

  }

  private updateForm(committee: Committee) {
    if (committee['header']) {
      this.committeeForm.get('header').patchValue(committee.header);
    }

    if (committee['images']) {
      for (let img of committee.images) {
        //console.log(img);
        this.uploadExistingFile(img, 'images');
      }
    }

    if (committee['staffs']) {
      this.staffsControls.clear();

      committee.staffs.forEach((staffs) => {
        const row = +staffs.row;
        this.staffsControls.push(this.newStaffGrp(row));
        staffs.staff.forEach((staff) => {
          const nestedFormGroup = this.newStaff();
          nestedFormGroup.patchValue(staff);

          this.staffControls(row).push(nestedFormGroup);
        })
      })
    }
    this.seq.setValue(committee.seq);
    this.currentSeq = committee.seq;
  }

  changeSeq(e) {
    this.seq.setValue((e.target.value as number));
  }

  get seq() {
    return this.committeeForm.get('seq');
  }

  get imagesControls() {
    if (this.committeeForm && this.committeeForm.get('images')) {
      return (this.committeeForm.get('images') as FormArray).controls;
    }
    return new FormArray([]);
  }

  onDeleteImage(index: number) {
    (<FormArray>this.committeeForm.get('images')).removeAt(index);
    this.images.splice(index,1);
    this.image = this.images.map(i => i.name).join(',');
  }

  get staffsControls(): FormArray {
    if (this.committeeForm && this.committeeForm.get('staffs')) {
      return (this.committeeForm.get('staffs') as FormArray);
    }
    return new FormArray([]);
  }

  staffControls(index: number): FormArray {
    if (this.committeeForm && this.staffsControls.at(index).get('staff')) {
      return (this.staffsControls.at(index).get('staff') as FormArray);
    }
    return new FormArray([]);
  }

  uploadCommiteeFile(event: any) {
    let selectedFiles = event.target.files;
    const attribute: string = 'images';

    if (selectedFiles) {
      for (let file of selectedFiles) {
        let reader = new FileReader();
        this.images.push(new FileUpload(file, file.type, file.name));
        reader.onload = (e: any) => {
          this.createImage(e.target.result, file.name, attribute);
        };
        reader.readAsDataURL(file);
      }
      this.image = this.images.map(i => i.name).join(',');
    }
  }

  createImage(img: any, name: string, attribute: string) {
    (<FormArray>this.committeeForm.get(attribute)).push(
      new FormGroup({
        result: new FormControl(img, Validators.required),
        name: new FormControl(name, Validators.required),
      })
    );
  }

  async getBase64ImageFromUrl(imageUrl, name: string, filetype: string) {
    let res = await fetch(imageUrl);
    let blob = await res.blob();

    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
      this.images.push(new FileUpload(new File([blob], name), filetype, name, imageUrl));
      this.image = this.images.map(i => i.name).join(',');
    })
  }

  uploadExistingFile(file: FileUpload, attributes: string) {
    this.getBase64ImageFromUrl(file.url, file.name, file.type)
      .then(result => this.createImage(result, file.name, attributes))
      .catch(err => console.error(err));
  }


  newStaff(): FormGroup {
    return this.fb.group({
      position: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)
    });
  }

  newStaffGrp(row: number): FormGroup {
    return this.fb.group({
      row: new FormControl(row), //row
      staff: this.fb.array([])
    })
  }

  onDeleteStaffRow(staffsIndex: number, staffIndex: number) {
    console.log(staffsIndex);
    this.staffControls(staffsIndex).removeAt(staffIndex);

    if(staffIndex === 0){
      this.staffsControls.removeAt(staffsIndex);
    }
  }

  onAddStaffColumn(staffsIndex: number) {
    if(this.staffControls(staffsIndex).controls.length >= 2){
      this.onAddStaffRow();
    } else {
      this.staffControls(staffsIndex).push(this.newStaff());
    }
  }

  onAddStaffRow() {
    const row = ((this.staffsControls.length - 1) + 1);
    this.staffsControls.push(this.newStaffGrp(row));
    this.staffControls(row).push(this.newStaff());

  }
  onSubmit() {
    let committee: Committee = this.committeeForm.value;
    committee = this.syncSeq(committee);
    console.log(committee);
    if (this.editMode) {
      // first image  -- submit image
      if (this.currentSeq != committee.seq) {
        this.exchangeSeq(committee.seq);
      }
      this.committeeService.deleteCommittee(this.id);
    }
    this.committeeService.storeCommittee(committee, this.images);
    setTimeout(() => {this.onCancel()}, 2000);
  }

  syncSeq(committee : Committee) : Committee{
    let counter : number = 0;
    committee.staffs.forEach( s => {
      committee.staffs[counter].row = counter;
      counter++;
    });

    return committee;
  }

  exchangeSeq(newSeq: string) {
    let c: Committee = this.committee.find(i => i.seq == newSeq);

    let path: string = c.key ;
    c.seq = this.currentSeq;
    c.key = null;

    this.committeeService.updateCommittee(path, c);
  }

  onCancel() {
    this.image = '';
    this.images = [];
    this.editMode = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDelete() {
    this.committeeService.deleteCommittee(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
