import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.css']
})
export class CultureComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute) {

  }
}
