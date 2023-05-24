import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommitteeComponent } from './committee.component';
import { CommitteeListComponent } from './committee-list/committee-list.component';
import { CommitteeDetailComponent } from './committee-list/committee-detail/committee-detail.component';
import { CommitteeEditComponent } from './committee-edit/committee-edit.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from '../auth/auth.guard';



@NgModule({
  declarations: [
    CommitteeComponent,
    CommitteeListComponent,
    CommitteeDetailComponent,
    CommitteeEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'list', component: CommitteeListComponent },
      {
        path: 'list/new',
        component: CommitteeEditComponent,
        canActivate: [AuthGuard]
        // resolve: [CultureResolverService]
      },
      {
        path: 'list/:id',
        component: CommitteeEditComponent,
        canActivate: [AuthGuard]
        // resolve: [CultureResolverService]
      },
      {
        path: '',
        component: CommitteeListComponent
      }
    ]),
    SharedModule
  ]
})
export class CommitteeModule { }
