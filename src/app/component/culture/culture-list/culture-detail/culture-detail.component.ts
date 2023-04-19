import { Component, Input } from '@angular/core';
import { Culture } from 'src/app/model/culture.model';

@Component({
  selector: 'app-culture-detail',
  templateUrl: './culture-detail.component.html',
  styleUrls: ['./culture-detail.component.css']
})
export class CultureDetailComponent {
  @Input() culture: Culture;
  @Input() index: number;

  constructor(){

  }
}
