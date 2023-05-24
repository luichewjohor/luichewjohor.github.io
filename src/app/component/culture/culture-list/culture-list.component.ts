import { Component, OnDestroy, OnInit } from '@angular/core';
import { CultureService } from '../culture.service';
import { Culture } from 'src/app/model/culture.model';
import { Subscription, map } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-culture-list',
  templateUrl: './culture-list.component.html',
  styleUrls: ['./culture-list.component.css']
})
export class CultureListComponent implements OnInit,OnDestroy{
  cultures: Culture[];
  user : User = null;
  subscription: Subscription;
  
  constructor( private cultureService: CultureService,
    private router: Router,
    private route: ActivatedRoute,
    private authService : AuthService ){

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.retrieveCulture();
  }

  retrieveCulture(): void {
    this.subscription = this.cultureService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key,...c.payload.val() })
        )
      )
    )
    .subscribe( data =>{
      data.sort((a, b) => a.seq.localeCompare(b.seq));
      this.cultures = data;
      this.user = this.authService.getCurrentUser();
      console.log(this.user);
    });

  }


  onNewCulture(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
