import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { FormPreviewComponent } from './form-preview/form-preview.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: ':id',
    component: FormPreviewComponent
  },
  {
    path: '',
    component: FormPreviewComponent
  }
]

@NgModule({
  declarations: [
    FormComponent,
    FormPreviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class FormModule { }
