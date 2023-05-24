import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { HomeComponent } from './home.component';
import { AuthGuard } from '../auth/auth.guard';
import { ChairmanEditComponent } from './chairman-edit/chairman-edit.component';
import { ChairmanDetailComponent } from './chairman-detail/chairman-detail.component';
import { HomeListComponent } from './home-list/home-list.component';
import { HomeEditComponent } from './home-edit/home-edit.component';
import { HomeDetailComponent } from './home-detail/home-detail.component';

const routes: Routes = [
  {
    path: 'new',
    component: HomeEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: HomeEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chairman/new',
    component: ChairmanEditComponent
  },
  {
    path: 'chairman/:id',
    component: ChairmanEditComponent
  },
  {
    path: '',
    component: HomeListComponent
  }
]

@NgModule({
  declarations: [HomeComponent,  ChairmanEditComponent, ChairmanDetailComponent, HomeListComponent, HomeEditComponent, HomeDetailComponent],
  imports: [CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule]
})
export class HomeModule { }
