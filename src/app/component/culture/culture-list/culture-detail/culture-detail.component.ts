import { Component, Input, OnInit } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { AuthService } from 'src/app/component/auth/auth.service';
import { Culture } from 'src/app/model/culture.model';

@Component({
  selector: 'app-culture-detail',
  templateUrl: './culture-detail.component.html',
  styleUrls: ['./culture-detail.component.css']
})
export class CultureDetailComponent implements OnInit{
  user : User = null;
  @Input() culture: Culture;

  constructor(private authService : AuthService){

  }

  ngOnInit() {
    this.user = null;
    this.user = this.authService.getCurrentUser();
    console.log(this.user);
  }

}
