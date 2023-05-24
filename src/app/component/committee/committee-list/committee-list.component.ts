import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommitteeService } from '../committee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Committee } from 'src/app/model/committee.model';
import { Subscription, map } from 'rxjs';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-committee-list',
  templateUrl: './committee-list.component.html',
  styleUrls: ['./committee-list.component.css']
})
export class CommitteeListComponent implements OnInit,OnDestroy{
  committee : Committee [] = [];
  user : User = null;
  subscription: Subscription;

  constructor(private committeeService: CommitteeService,
    private router: Router,
    private route: ActivatedRoute,
    private authService : AuthService){

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.retrieveCommittee();
  }

  retrieveCommittee(): void {
    this.subscription = this.committeeService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key,...c.payload.val() })
        )
      )
    ).subscribe( data =>{
      data.sort((a, b) => a.seq.localeCompare(b.seq));
      this.committee = data;
      this.user = this.authService.getCurrentUser();
      console.log(this.committee);
    });

  }

  onNewCommittee(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
