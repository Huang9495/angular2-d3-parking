import { Component, OnInit, } from '@angular/core';



@Component({
  selector: 'app-Stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})


export class StatsComponent implements OnInit {

//dayStats = new Array(1441);


        constructor(){}
        ngOnInit() {

//        this.addParkingSpotToStats(parkingTimeArray);

        }
/*
        var self = this;
     	addParkingSpotToStats(parkingTimeArray) {

			      for (var i = 0; i < parkingTimeArray.length; i++) {
			        
			        switch (parkingTimeArray[i]) {
			          case 0:
			          //当判断停车点为超出监控范围
			            self.bayStatus = 'parkingNoMonitoring';
			            break;
			          case 1:
			          //当判断该停车点为空闲
			            self.bayStatus = 'parkingEmpty';
			            break;
			          case 2:
			          //当判断该停车点已经停车了
			            self.bayStatus = 'parkingTaken';
			            break;
			          case 3:
			          //当判断该停车将会违反
			            self.bayStatus = 'parkingWillViolate';
			            break;
			          case 4:
			          //当判断该停车是合法的
			            self.bayStatus = 'parkingInViolation';
			            break;
			        }
			        //判断相应的状态后会在该状态后加1
			        this.dayStats[i][bayStatus] += 1;

			      } 


   		}

*/          
}