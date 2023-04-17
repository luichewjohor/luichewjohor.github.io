import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Culture } from '../../model/culture.model';

@Injectable({
  providedIn: 'root'
})
export class CultureService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  storeCulture( culture : Culture) {
    console.log(environment.url);
    this.http
      .put(
        environment.url,
        culture
      )
      .subscribe(response => {
        console.log(response);
      });
  }

}
