import { Component, OnInit, Inject} from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ParkingService } from '../services/parking.service';
import { ToastComponent } from '../shared/toast/toast.component';


@Component({
  selector: 'app-parkings',
  templateUrl: './parkings.component.html',
  styleUrls: ['./parkings.component.scss'],
})



export class ParkingsComponent implements OnInit {
  
  parking = {

     events :1000,
     violations :1000,
     free :1000,
     taken :1000,
     punctual :500,
     willoverstay :200,
     overlimit :300,
     unmonitored :400,
  };
  parkings = [];
  
  isLoading = true;
  isEditing = false;
  //sendDataForm: FormGroup;
  constructor(
              private parkingService:  ParkingService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent) {}

//定义初始化函数
  ngOnInit() {
  //改服务器下的获取数据的方法
    this.getParkings();
  }  
  getParkings() {

    this.parkingService.getParkings().subscribe(

      parking => this.parkings = parking,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }
}