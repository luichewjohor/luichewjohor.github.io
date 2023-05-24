import { Component, Input, OnInit } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { Chairman } from 'src/app/model/chairman.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-chairman-detail',
  templateUrl: './chairman-detail.component.html',
  styleUrls: ['./chairman-detail.component.css']
})
export class ChairmanDetailComponent implements OnInit{
  user : User = null;
  @Input() chairman: Chairman;

  constructor(private authService : AuthService){
  }

  ngOnInit() {
    this.user = null;
    this.user = this.authService.getCurrentUser();
    console.log(this.user);
  }
}
