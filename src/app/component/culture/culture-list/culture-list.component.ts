import { Component, OnInit } from '@angular/core';
import { CultureService } from '../culture.service';
import { Culture } from 'src/app/model/culture.model';
import { map } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-culture-list',
  templateUrl: './culture-list.component.html',
  styleUrls: ['./culture-list.component.css']
})
export class CultureListComponent implements OnInit{
  cultures: Culture[];

  constructor( private cultureService: CultureService,
    private router: Router,
    private route: ActivatedRoute ){

  }
  ngOnInit(): void {
    this.retrieveCulture();
  }

  retrieveCulture(): void {
    this.cultureService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key,...c.payload.val() })
        )
      )
    )
    .subscribe( data =>{
      this.cultures = data;
      console.log(this.cultures);
    });

  }


  onNewCulture(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
