import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective],
    imports: [CommonModule,ReactiveFormsModule],
    exports: [
    AlertComponent,
    CommonModule,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
