import {Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public onRedirect$ = new Subject<void>();

  constructor() { }

  redirectToFooter() {
    this.onRedirect$.next();
  }
}
