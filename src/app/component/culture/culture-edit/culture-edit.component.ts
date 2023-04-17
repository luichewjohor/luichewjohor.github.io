import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CultureService } from '../culture.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  images: any[] = [];
  private fileReader = new FileReader();

  constructor(
    private cultureService: CultureService,
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
    this.cultureService.storeCulture(this.cultureForm.value);
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
    this.images = [];
    let selectedFiles = event.target.files;
    console.log(selectedFiles);
    if (selectedFiles) {
      for (let file of selectedFiles) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result);
          this.createImage(e.target.result,file.name);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  private readFiles(files: any[], index: number) {
    let file = files[index];
    this.fileReader.onload = () => {
      this.images.push({
        result: this.fileReader.result,
        name: file.name,
      });
      if (files[index + 1]) {
        this.readFiles(files, index + 1);
      } else {
        console.log('loaded all files');
      }
    };
    this.fileReader.readAsDataURL(file);
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
