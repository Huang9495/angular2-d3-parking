import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as d3 from 'd3';
import {geoTransform,geoProjection,geoPath} from "d3-geo";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs/BehaviorSubject"


@Injectable()
export class MapService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) {}

    getMaps(): Observable<any> {
      	console.log('getMaps')
        return this.http.get('http://localhost:3000/api/maps')
    }


    getMaps2(dataFileName): Observable<any> {
      	console.log('getMaps2')
        return this.http.get("http://d2qnyrq2dk7zba.cloudfront.net/"+dataFileName)
    } 

}
