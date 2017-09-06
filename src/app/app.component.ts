import { Component,Inject } from '@angular/core';
import { Http } from '@angular/http';

//import {Socket} from 'ng-socket-io';
//import * as io from "socket.io-client";

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
//  constructor(@Inject('auth')private service){}

//  msg:string;
//	sendMsg(msg){
//	console.log('3333333333');
//	console.log(msg);
//	this.service.sendMessage(msg);
//	}
//}
}


