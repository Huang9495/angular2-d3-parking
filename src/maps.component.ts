import { Component, OnInit, Inject,ElementRef, AfterViewInit,ViewEncapsulation} from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service'; 

import * as L from 'leaflet';
import * as d3 from 'd3';
import {geoTransform,geoProjection,geoPath} from "d3-geo";
import { MomentModule } from 'angular2-moment';
export { select} from "d3-selection";


//import 'leaflet-d3-svg-overlay';


import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { MapService } from '../services/map.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Spot } from '../models/spot';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
})




export class MapsComponent implements OnInit {
  //private d3: D3; 
  private parentNativeElement: any;
  

  params = {};
  id = [];
  spot = [];


  isLoading = true;
  isEditing = false;

  //currentDate;
  _svg;
  _g;
  _collection;
  _path;
  _feature;
  parkingViolations: 0;
  parkingEvents: 0;

  map;
  mapLayerURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  constructor(
              private mapService:  MapService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent,
              )
              
              {
              }



  initMap(){
        console.log('init map');

        this.map = L.map('mapid', {
            center: L.latLng(38, 15),
            zoom: 5,
        });
        var osm = L.tileLayer(this.mapLayerURL, {minZoom: 3, maxZoom: 18});
        this.map.setView(L.latLng(-37.8100506, 144.961825), 16);

        this.map.addLayer(osm); 
  }

//定义初始化函数
  ngOnInit() {
       if( this.map == null ) this.initMap();


      d3.select('#leaflet-overlay-pane').selectAll('*').remove();
      this._svg = d3.select('#leaflet-overlay-pane').append("svg");
      this._g = this._svg.append("g").attr("class", "leaflet-zoom-hide");



  }

  ngAfterViewInit(){
      //定义数据文件名为该时刻的精确数的格式为‘YYYYMMDD.json’
      //var dataFileName = moment(currentDate).format('YYYYMMDD') + '.json';
      var dataFileName = '20140101.json';

      if( this.map == null )  console.log('map null')
      else console.log('map ! null')

      //采集该文件的数据
      this.getMaps(dataFileName);   
  }  

//从服务器mean中获取.json提车点的数据
  getMaps(dataFileName) {
    var self = this;



      if( this.map == null )  console.log('map null')
      else console.log('map ! null')

    this.mapService.getMaps2(dataFileName).subscribe(
      collection => {
        console.log('ddff');

        //定义上述引入文件中的数据collection为._collection
        self._collection = JSON.parse(collection._body);
//        console.log( self._collection );


        for (var i = 0; i < self._collection.features.length; i++) {

            var feature = self._collection.features[i];
            
            var coordinates = feature.geometry.coordinates;
            var bayId = feature.properties.bayId;
            var streetMarker = feature.properties.streetMarker;
            var streetName = feature.properties.streetName;
            var events = feature.properties.sensor;

            var parkingTimeArray = this.parkingSpotTimeArray(self._collection.features[i],20140101);
            self._collection.features[i].properties.parkingData = parkingTimeArray;


        }








        var transform = geoTransform({point: function(x,y){
            var point = self.map.latLngToLayerPoint(new L.LatLng(y,x));
            this.stream.point(point.x, point.y);

        }});
        self._path = geoPath(transform);
        self._feature = self._g.selectAll("path")
                            .data(self._collection.features)
                            .enter().append("path")
                            .attr("d", self._path)
                            .on( "mouseout" ,  function(d) { console.log(d); },
                                 "click",  function(d) { console.log(d); },
                                 "mouseover", function(d) { console.log(d); },
                            );

        


          let minute = 1;



          d3.select("#leaflet-overlay-pane svg").selectAll("path").attr("class", function (d) {

                  var key = d.properties.bayId;
                  var bayStatus;

                  switch (d.properties.parkingData[minute]) {
                    case 0:
                      bayStatus = 'parking-no-monitoring';
                      break;
                    case 1:
                      bayStatus = 'parking-empty';
                      break;
                    case 2:
                      bayStatus = 'parking-taken';
                      break;
                    case 3:
                      bayStatus = 'parking-will-violate';
                      break;
                    case 4:
                      bayStatus = 'parking-in-violation';
                      break;
                  }

                  return bayStatus;

        });


      }
    );   
  }








//判断该车位是那种情况，然后在那种情况里面增加1，即增加停车点的统计
    addParkingSpotToStats(parkingTimeArray) {
      let bayStatus;
      for (var i = 0; i < parkingTimeArray.length; i++) {
        
        switch (parkingTimeArray[i]) {
          case 0:
          //当判断停车点为超出监控范围
            bayStatus = 'parkingNoMonitoring';
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
      var self = this;
      for (i = 0; i < feature.properties.sensor.length; i++) {

        //Add to total park events this day
        this.parkingEvents += 1;

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
          this.parkingViolations += 1;


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

      self.addParkingSpotToStats(processedData);

      return processedData;
    }

 



}
