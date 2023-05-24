import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;
  userName : string ='';
  public isCollapsed = true;

  constructor(private authService: AuthService,
              private sharedService : SharedService,
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

  redirectTo() {
    this.sharedService.redirectToFooter();
  }

  openFile(fileName : string){
    // var f = new File('/data/logs/today.log');

    // if()
    window.open('assets/form/' + fileName + '.pdf');
  }
}
