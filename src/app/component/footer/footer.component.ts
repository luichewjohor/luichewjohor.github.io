import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  // display : any;
  // center: google.maps.LatLngLiteral = {lat: 2.0449448, lng: 102.5670603};
  // zoom = 18;
  // markerOptions: google.maps.MarkerOptions = {draggable: false};
  // markerPositions: google.maps.LatLngLiteral[] = [{lat: 2.0449448, lng: 102.5670603}];

  constructor(private sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.subscription = this.sharedService.onRedirect$.subscribe(s => {
      this.scrollToBottom();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  scrollToBottom(): void {
    window.scrollTo(0, document.body.scrollHeight);
  }

  // moveMap(event: google.maps.MapMouseEvent) {
  //   if(event.latLng!= null)
  //   this.center = (event.latLng.toJSON());
  // }

  // move(event: google.maps.MapMouseEvent) {
  //   if(event.latLng != null)
  //   this.display = event.latLng.toJSON();
  // }

  // addMarker(event: google.maps.MapMouseEvent) {
  //   console.log(event.latLng.toJSON());
  //   if(event.latLng != null)
  //   this.markerPositions.push(event.latLng.toJSON());
  // }
}
