import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CultureService } from '../culture.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FileUpload } from 'src/app/model/file-upload.model';
import { Subscription, map, tap } from 'rxjs';
import { Culture } from 'src/app/model/culture.model';

@Component({
  selector: 'app-culture-edit',
  templateUrl: './culture-edit.component.html',
  styleUrls: ['./culture-edit.component.css'],
})
export class CultureEditComponent implements OnInit, OnDestroy {
  id: string;
  editMode = false;
  cultureForm: FormGroup;
  imageList: FileUpload[] = [];
  image: string = '';
  headerImgLst: FileUpload[] = [];
  headerImg: string = '';
  subscription: Subscription;
  culture: Culture[] = [];
  currentSeq: string;

  constructor(
    private cultureService: CultureService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // ngAfterViewInit() {
  //   // Hack: Scrolls to top of Page after page view initialized
  //   let top = document.getElementById('top');
  //   if (top !== null) {
  //     top.scrollIntoView();
  //     top = null;
  //   }
  // }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  ngOnDestroy(): void { }

  onSubmit() {
    let culture: Culture = this.cultureForm.value;
    //console.log(culture);

    if (this.editMode) {
      // first image  -- submit image
      if (this.currentSeq != culture.seq) {
        this.exchangeSeq(culture.seq);
      }
      this.cultureService.deleteCulture(this.id);
    }

    this.cultureService.storeCulture(culture, this.imageList, this.headerImgLst);
    setTimeout(() => { this.onCancel() }, 2000);
  }

  onCancel() {
    this.image = '';
    this.imageList = [];
    this.editMode = false;
    this.culture = [];
    this.currentSeq = '';
    this.headerImg = '';
    this.headerImgLst = [];
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  get descriptionsControls() {
    if (this.cultureForm && this.cultureForm.get('description')) {
      return (this.cultureForm.get('description') as FormArray).controls;
    }
  }

  onAddParagraph() {
    (<FormArray>this.cultureForm.get('description')).push(
      new FormGroup({
        paragraph: new FormControl(null, Validators.required),
      })
    );
  }

  onDeleteParagraph(index: number) {
    (<FormArray>this.cultureForm.get('description')).removeAt(index);
  }

  get imagesControls() {
    if (this.cultureForm && this.cultureForm.get('images')) {
      return (this.cultureForm.get('images') as FormArray).controls;
    }
  }

  get headerImageControls() {
    if (this.cultureForm && this.cultureForm.get('headerImage')) {
      return (this.cultureForm.get('headerImage') as FormArray).controls;
    }
  }
  createImage(img: any, name: string, attribute: string) {
    (<FormArray>this.cultureForm.get(attribute)).push(
      new FormGroup({
        result: new FormControl(img, Validators.required),
        name: new FormControl(name, Validators.required),
      })
    );
  }

  uploadCultureFile(event: any, isHeader: boolean) {
    let selectedFiles = event.target.files;
    const attribute: string = isHeader ? 'headerImage' : 'images';

    if (selectedFiles) {
      for (let file of selectedFiles) {
        if (isHeader) {
          this.headerImgLst.push(new FileUpload(file, file.type, file.name));
        } else {
          this.imageList.push(new FileUpload(file, file.type, file.name));
        }

        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.createImage(e.target.result, file.name, attribute);
        };
        reader.readAsDataURL(file);
      }
      this.image = this.imageList.map(i => i.name).join(',');
      this.headerImg = this.headerImgLst.map(i => i.name).join(',');
    }
  }

  async getBase64ImageFromUrl(imageUrl, name: string, filetype: string, isHeader: boolean) {
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
      if (isHeader) {
        this.headerImgLst.push(new FileUpload(new File([blob], name), filetype, name, imageUrl));
      } else {
        this.imageList.push(new FileUpload(new File([blob], name), filetype, name, imageUrl));
      }
      this.image = this.imageList.map(i => i.name).join(',');
      this.headerImg = this.headerImgLst.map(i => i.name).join(',');
    })
  }

  uploadExistingFile(file: FileUpload, attributes: string, isHeader: boolean) {
    this.getBase64ImageFromUrl(file.url, file.name, file.type, isHeader)
      .then(result => this.createImage(result, file.name, attributes))
      .catch(err => console.error(err));
  }

  private initForm() {
    this.cultureForm = new FormGroup({
      header: new FormControl('', Validators.required),
      headerImage: new FormArray([]),
      images: new FormArray([]),
      description: new FormArray([]),
      seq: new FormControl('0', Validators.required)
    });

    let culture: Culture;
    this.imageList = [];

    if (this.editMode) {
      this.cultureService
        .getCulture(this.id)
        .snapshotChanges()
        .pipe(
          tap((res) => console.debug(res)),
          map((d) => ({ key: d.payload.key, ...d.payload.val() }))
        )
        .subscribe((data) => {
          culture = data;
          this.updateForm(culture);
          // console.log(this.imageList);
        });
    }

    this.subscription = this.cultureService.getAllCulture()
      .subscribe(data => {
        this.culture = data;
        // this.user = this.authService.getCurrentUser();
        //console.log(this.culture);
        if (!this.editMode) {
          this.culture.push(new Culture('', [], this.culture.length.toString()));
          this.seq.setValue((this.culture.length - 1).toString());
          this.currentSeq = (this.culture.length - 1).toString();
        }
      });

  }

  changeSeq(e) {
    this.seq.setValue((e.target.value as number));
  }

  get seq() {
    return this.cultureForm.get('seq');
  }

  private updateForm(culture: Culture) {
    //console.log(culture);
    if (culture['description']) {
      for (let desc of culture.description) {
        (<FormArray>this.cultureForm.get('description')).push(
          new FormGroup({
            paragraph: new FormControl(desc.paragraph, Validators.required),
          })
        );
      }
    }

    if (culture['images']) {
      for (let img of culture.images) {
        //console.log(img);
        this.uploadExistingFile(img, 'images', false);
      }
    }

    if (culture['header']) {
      this.cultureForm.get('header').patchValue(culture.header);
    }

    if (culture['headerImage']) {
      for (let img of culture.headerImage) {
        //console.log(img);
        this.uploadExistingFile(img, 'headerImage', true);
      }
    }

    this.seq.setValue(culture.seq);
    this.currentSeq = culture.seq;
  }

  exchangeSeq(newSeq: string) {
    let c: Culture = this.culture.find(i => i.seq == newSeq);

    let path: string = c.key;
    c.seq = this.currentSeq;
    c.key = null;

    console.log(c);
    this.cultureService.updateCulture(path, c);
  }

  onDelete(){
    this.cultureService.deleteCulture(this.id);
    this.syncCultureSeq();
    this.onCancel();
  }
  
  syncCultureSeq() {
    const clist: Culture[] = this.culture.filter(c => c.key !== this.id);

    let counter: number = 0;
    clist.forEach(s => {
      s.seq  = counter.toString();
      counter++;
    });
    this.cultureService.updateCultureSeq(clist);
  }
}
