import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { CultureComponent } from './culture.component';
import { CultureEditComponent } from './culture-edit/culture-edit.component';
import { CultureListComponent } from './culture-list/culture-list.component';
import { CultureDetailComponent } from './culture-list/culture-detail/culture-detail.component';



@NgModule({
  declarations: [CultureComponent, CultureEditComponent,CultureListComponent, CultureDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'list', component: CultureListComponent },
      {
        path: 'list/new',
        component: CultureEditComponent
        // resolve: [CultureResolverService]
      },
      {
        path: 'edit/:id',
        component: CultureEditComponent
        // resolve: [CultureResolverService]
      }
    ]),
    SharedModule
  ]
})
export class CultureModule { }
