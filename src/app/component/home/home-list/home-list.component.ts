import { Component, OnInit } from '@angular/core';
import { User } from '../../auth/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';
import { Chairman } from 'src/app/model/chairman.model';
import { AuthService } from '../../auth/auth.service';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit{
  user : User = null;
  chairmans : Chairman[] = [];
  subscription: Subscription;
  
  constructor( 
    private homeService : HomeService,
    private authService : AuthService,
    private router: Router,
    private route: ActivatedRoute){

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.retrieveCulture();
  }

  retrieveCulture(): void {
    this.subscription = this.homeService.getAllChairman().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key,...c.payload.val() })
        )
      )
    )
    .subscribe( data =>{
      data.sort((a, b) => a.seq.localeCompare(b.seq));
      this.chairmans = data;
      this.user = this.authService.getCurrentUser();
      console.log(this.user);
    });

  }

  onAddChairman(){
    this.router.navigate(['chairman/new'], {relativeTo: this.route});
  }
}
