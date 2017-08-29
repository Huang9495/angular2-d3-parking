import { Component, OnInit,  ViewChild,Inject, ViewEncapsulation,ElementRef} from '@angular/core';
import { ParkingSpot }      from '../models/parkingspot';

@Component({
  selector: 'app-home',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.css'],
})


export class HomesComponent implements OnInit {

    spot:ParkingSpot;

        ngOnInit() {
        }


    getNotification(evt) {
        console.log(evt.properties);
        let bayId = evt.properties.bayId;
        let streetMaker = evt.properties.streetMaker;
        let streetName = evt.properties.streetName;
        let events = [];//evt.properties.sensors;
        this.spot = new ParkingSpot(bayId,streetMaker,streetName);

        // Do something with the notification (evt) sent by the child!
    } 
           
          
}
