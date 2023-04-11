import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
    SharedModule]
})
export class HomeModule { }
