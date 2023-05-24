import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { CultureComponent } from './culture.component';
import { CultureEditComponent } from './culture-edit/culture-edit.component';
import { CultureListComponent } from './culture-list/culture-list.component';
import { CultureDetailComponent } from './culture-list/culture-detail/culture-detail.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'list', component: CultureListComponent },
  {
    path: 'list/new',
    component: CultureEditComponent,
    canActivate: [AuthGuard]
    // resolve: [CultureResolverService]
  },
  {
    path: 'list/:id',
    component: CultureEditComponent,
    canActivate: [AuthGuard]
    // resolve: [CultureResolverService]
  },
  {
    path: '',
    component: CultureListComponent
  }
]

@NgModule({
  declarations: [CultureComponent, CultureEditComponent,CultureListComponent, CultureDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CultureModule { }
