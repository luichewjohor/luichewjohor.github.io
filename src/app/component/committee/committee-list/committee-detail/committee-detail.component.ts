import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/component/auth/auth.service';
import { User } from 'src/app/component/auth/user.model';
import { Committee } from 'src/app/model/committee.model';

@Component({
  selector: 'app-committee-detail',
  templateUrl: './committee-detail.component.html',
  styleUrls: ['./committee-detail.component.css']
})
export class CommitteeDetailComponent implements OnInit {
  user : User = null;
  @Input() committee : Committee;

  constructor(private authService : AuthService){

  }

  ngOnInit() {
    this.user = null;
    this.user = this.authService.getCurrentUser();
    console.log(this.user);
  }
}
