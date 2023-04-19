import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CultureService } from '../culture.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FileUpload } from 'src/app/model/file-upload.model';
import { FileService } from 'src/app/service/file.service';

export interface UploadedImageInfo {
  result: any;
  name: string;
}

@Component({
  selector: 'app-culture-edit',
  templateUrl: './culture-edit.component.html',
  styleUrls: ['./culture-edit.component.css'],
})
export class CultureEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  cultureForm: FormGroup;
  images: FileList;
  private fileReader = new FileReader();

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  constructor(
    private cultureService: CultureService,
    private uploadFileService: FileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  ngOnDestroy(): void {}

  onSubmit() {
    this.cultureService.storeCulture(this.cultureForm.value,this.images);
    this.router.navigate(['culture']);
  }

  onCancel() {}

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

  get imagesControls(): FormArray {
    if (this.cultureForm && this.cultureForm.get('image')) {
      return this.cultureForm.get('image') as FormArray;
    }
  }
  createImage(img, name) {
    // const newImage = new FormControl(img, Validators.required);
    // (<FormArray>this.cultureForm.get('image')).push(newImage);

    (<FormArray>this.cultureForm.get('image')).push(
      new FormGroup({
        result: new FormControl(img, Validators.required),
        name :  new FormControl(name, Validators.required),
      })
    );
  }

  uploadCultureFile(event: any) {
    let selectedFiles = event.target.files;
    console.log(selectedFiles);
    this.images = selectedFiles;
    if (selectedFiles) {
      for (let file of selectedFiles) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.createImage(e.target.result,file.name);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  private initForm() {
    let header = '';
    let image = new FormArray([]);
    let description = new FormArray([]);

    this.cultureForm = new FormGroup({
      header: new FormControl(header, Validators.required),
      image: image,
      description: description,
    });
  }
}
