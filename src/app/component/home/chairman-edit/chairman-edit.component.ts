import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HomeService } from '../home.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'src/app/model/file-upload.model';
import { Chairman } from 'src/app/model/chairman.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chairman-edit',
  templateUrl: './chairman-edit.component.html',
  styleUrls: ['./chairman-edit.component.css']
})
export class ChairmanEditComponent implements OnInit,OnDestroy {
  id: string;
  editMode = false;
  chairmanForm: FormGroup;
  images: FileUpload[] = [];
  image: string = '';;
  subscription: Subscription;
  chairman : Chairman [] = [];
  currentSeq: string;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnDestroy() {
  }

  ngOnInit() {
    this.currentSeq = '0';
    this.image = '';
    this.images = [];
    this.chairman = [];
    this.editMode = false;

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  initForm(){
    this.chairmanForm = this.fb.group({
      images: this.fb.array([]),
      title: new FormControl('', Validators.required),
      name : new FormControl('', Validators.required),
      date : new FormControl('', Validators.required),
      description : new FormControl(''),
      seq: '0',
    });

    this.subscription = this.homeService.getChairManList()
    .subscribe(data => {
      this.chairman = data;
      // this.user = this.authService.getCurrentUser();
      if (!this.editMode) {
        this.chairman.push({ key: '',  date :'',description : '', images: [],name :'',seq: this.chairman.length.toString(),title: ''});
        this.seq.setValue((this.chairman.length - 1).toString());
        this.currentSeq = (this.chairman.length - 1).toString();
      } else {
        let c: Chairman = this.chairman.find(i => i.key == this.id);
        this.updateForm(c);
      } 
      console.log(this.chairman);
    });
  }


  updateForm(chairman : Chairman){
    if (chairman['title']) {
      this.chairmanForm.get('title').patchValue(chairman.title);
    }

    if (chairman['name']) {
      this.chairmanForm.get('name').patchValue(chairman.name);
    }
    
    if (chairman['date']) {
      this.chairmanForm.get('date').patchValue(chairman.date);
    }

    if (chairman['description']) {
      this.chairmanForm.get('description').patchValue(chairman.description);
    }

    if (chairman['images']) {
      for (let img of chairman.images) {
        //console.log(img);
        this.uploadExistingFile(img, 'images');
      }
    }

    // if (committee['staffs']) {
    //   this.staffsControls.clear();

    //   committee.staffs.forEach((staffs) => {
    //     const row = +staffs.row;
    //     this.staffsControls.push(this.newStaffGrp(row));
    //     staffs.staff.forEach((staff) => {
    //       const nestedFormGroup = this.newStaff();
    //       nestedFormGroup.patchValue(staff);

    //       this.staffControls(row).push(nestedFormGroup);
    //     })
    //   })
    // }
    this.seq.setValue(chairman.seq);
    this.currentSeq = chairman.seq;
  }


  get imagesControls() {
    if (this.chairmanForm && this.chairmanForm.get('images')) {
      return (this.chairmanForm.get('images') as FormArray).controls;
    }
  }

  uploadPhoto(event: any) {
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
    console.log((<FormArray>this.chairmanForm.get(attribute)));
    (<FormArray>this.chairmanForm.get(attribute)).push(
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

  onSubmit() {
    let chairman: Chairman = this.chairmanForm.value;
    // console.log(chairman);
    if (this.editMode) {
      // first image  -- submit image
      if (this.currentSeq != chairman.seq) {
        this.exchangeSeq(chairman.seq);
      }
      this.homeService.deleteChairman(this.id);
    }
    this.homeService.storeChairman(chairman, this.images);
    setTimeout(() => {this.onCancel()}, 2000);
  }

  onCancel(){
    this.image = '';
    this.images = [];
    this.editMode = false;
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  exchangeSeq(newSeq: string) {
    let c: Chairman = this.chairman.find(i => i.seq == newSeq);

    let path: string = c.key ;
    c.seq = this.currentSeq;
    c.key = null;

    this.homeService.updateChairman(path, c);
  }

  changeSeq(e) {
    this.seq.setValue((e.target.value as number));
  }

  get seq() {
    return this.chairmanForm.get('seq');
  }

  onDeleteImage(index: number) {
    (<FormArray>this.chairmanForm.get('images')).removeAt(index);
    this.images.splice(index,1);
    this.image = this.images.map(i => i.name).join(',');
  }

  onDelete(){
    this.homeService.deleteChairman(this.id);
    this.onCancel();
  }

}
