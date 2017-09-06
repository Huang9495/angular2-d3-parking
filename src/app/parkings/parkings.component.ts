import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

//import { ParkingService } from '../services/parking.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-parkings',
  templateUrl: './parkings.component.html',
  styleUrls: ['./parkings.component.scss'],
})



export class ParkingsComponent implements OnInit {
  dataFileName = '20140101.json';
  _collection;

  /*
  parking = {

     events,
     violations ,
     free ,
     taken,
     punctual,
     willoverstay,
     overlimit,
     unmonitored,
  };
  */
  parkings = [];
  
  isLoading = true;
  isEditing = false;
  //sendDataForm: FormGroup;
  constructor(
              private mapService:  MapService,
              //private parkingService:  ParkingService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) {}

//定义初始化函数
  ngOnInit() {
  //改服务器下的获取数据的方法
//    this.getParkings();
      this.getMaps(this.dataFileName); 
  }



  getMaps(dataFileName) {
      var self = this;
      this.mapService.getMaps3(dataFileName).subscribe(
            collection => {
              console.log('ddff');
              console.log(collection);
              console.log( collection.parkingEvents);
              self._collection = collection;
            }
            
      )
  }

/*  
  getParkings() {

    this.parkingService.getParkings().subscribe(

      parking => this.parkings = parking,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }
*/




}
