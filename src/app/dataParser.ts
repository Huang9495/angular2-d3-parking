import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class DataParser {


//判断该车位是那种情况，然后在那种情况里面增加1，即增加停车点的统计
  addParkingSpotToStats(parkingTimeArray) {
    let bayStatus;
//    this.dayStats = new Array(1441);
//    this.parkingViolations = 0;
//    this.parkingEvents = 0;
    for (var i = 0; i < parkingTimeArray.length; i++) {
      
      switch (parkingTimeArray[i]) {
        case 0:
        //当判断停车点为超出监控范围
          bayStatus = 'parkingoMonitoring';
          break;
        case 1:
        //当判断该停车点为空闲
          bayStatus = 'parkingEmpty';
          break;
        case 2:
        //当判断该停车点已经停车了
          bayStatus = 'parkingTaken';
          break;
        case 3:
        //当判断该停车将会违反
          bayStatus = 'parkingWillViolate';
          break;
        case 4:
        //当判断该停车是合法的
          bayStatus = 'parkingInViolation';
          break;   
      }
    }
  }


  parkingSpotTimeArray(feature,currentDate) {
    //定义日期为当前日期且格式为YYYY-MM-DD
    var date = 20140101;
    var dataDate = 20140101;

    var processedData = new Array(1440);

    var i,j;
    var start,end;
    var signLookup = {};

    //Loop through add signPlate times, this is when monitoring is happening
    for (i = 0; i < feature.properties.signPlates.length; i++) {

      //Performance Change
      //Quicker to pull out hour and times by 60 and then add minute then to use moment
      start = (feature.properties.signPlates[i].StartTime.substring(0,2)*60) + parseInt(feature.properties.signPlates[i].StartTime.substring(3,5),10);
      end = (feature.properties.signPlates[i].EndTime.substring(0,2)*60) + parseInt(feature.properties.signPlates[i].EndTime.substring(3,5),10);

      signLookup['S'+feature.properties.signPlates[i].SignPlateId] = feature.properties.signPlates[i].MinutesAllowed;

      for (j = start; j <= end; j++) {
        processedData[j] = 1;
      }


    }

    //Loop through find each park add data
    for (i = 0; i < feature.properties.sensor.length; i++) {

      //Add to total park events this day
      //this.parkingEvents += 1;

      //Performance Change
      //Quicker to pull out hour and times by 60 and then add minute then to use moment
      start = (feature.properties.sensor[i].arrivalDateTime.substring(11,13)*60) + parseInt(feature.properties.sensor[i].arrivalDateTime.substring(14,16),10);
      end = (feature.properties.sensor[i].departDateTime.substring(11,13)*60) + parseInt(feature.properties.sensor[i].departDateTime.substring(14,16),10);

      var status;
      if (feature.properties.sensor[i].inViolation) {
        for ( j = start; j <= end; j++) {
          processedData[j] = 4;
        }

        var timeAllowed = signLookup['S'+feature.properties.sensor[i].signPlateId];

        if (end-start > timeAllowed) {
          for ( j = start; j <= start+ timeAllowed; j++) {
            processedData[j] = 3;
          }
        }

        //Add to total violations this day
        //this.parkingViolations += 1;


      } else {
        for ( j = start; j <= end; j++) {
          processedData[j] = 2;
        }
      }
    }



    //Loop through and find gaps fill in with unmonitored/free times
    for (j = 0; j <= 1440; j++) {
      //如果输入类型为数据processedData[j]为空的
      if(typeof processedData[j] === 'undefined'){
          processedData[j] = 0;
      }
    }

    this.addParkingSpotToStats(processedData);

    return processedData;
  }


  parse(collection){

        collection = JSON.parse(collection._body);

        for (var i = 0; i < collection.features.length; i++) {

            var feature = collection.features[i];
            
            var coordinates = feature.geometry.coordinates;
            var bayId = feature.properties.bayId;
            var streetMarker = feature.properties.streetMarker;
            var streetName = feature.properties.streetName;
            var events = feature.properties.sensor;

            var parkingTimeArray = this.parkingSpotTimeArray(collection.features[i],20140101);
            collection.features[i].properties.parkingData = parkingTimeArray;
        }  

        return collection;

  }


}