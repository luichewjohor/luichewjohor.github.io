import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CultureService } from '../culture.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-culture-edit',
  templateUrl: './culture-edit.component.html',
  styleUrls: ['./culture-edit.component.css']
})
export class CultureEditComponent implements OnInit,OnDestroy {
  id: number;
  editMode = false;
  cultureForm: FormGroup;
  images : any[] = [];
  private fileReader = new FileReader();

  constructor(
    private cultureService : CultureService,
    private route: ActivatedRoute,
    private router: Router){

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  ngOnDestroy(): void {

  }

  onSubmit(){

  }

  onCancel(){

  }

  uploadSupportingFile(e : Event){
    let files = e.target['files'];
    if (e.target['files']) {
      console.log(e.target['files']);
      this.readFiles(e.target['files'], 0);
    }
  }


  private readFiles(files: any[], index: number) {
    let file = files[index];
    this.fileReader.onload = () => {
      this.images.push(this.fileReader.result);
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
      image: new FormControl(image, Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

}

