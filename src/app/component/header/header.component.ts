import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;
  userName : string ='';

  constructor(private authService: AuthService,
              private router: Router){}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if(this.isAuthenticated){
        this.userName = user.email;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onAuthenticated(){
    if(this.isAuthenticated){
      this.authService.logout();
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
