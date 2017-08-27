import { Component, OnInit,  ViewChild,Inject, ViewEncapsulation,ElementRef} from '@angular/core';
import { D3Service, D3, Selection } from 'd3-ng2-service'; 
import * as d3 from 'd3';


@Component({
  selector: 'app-map1s',
  templateUrl: './map1s.component.html',
  styleUrls: ['./map1s.component.css'],
  encapsulation: ViewEncapsulation.None,
})


export class Map1sComponent implements OnInit {
//        @ViewChild('chart') private chartContainer: ElementRef;
//        private colors: any;
        svg;
        g;
        parkings = [{
            x:30,
            y:20,
            occupied:0,
            width: 500,
            height: 800 }];
        constructor(){}
//        var self = this;
        ngOnInit() {
                d3.select('#parking').selectAll('*').remove();
                let svg = d3.select('#parking').append('svg')

                let g = svg.append('g')

                let spot = g.selectAll('.spot').data(this.parkings)
                spot.enter().append('rect')
                        .attr('class', 'spot')
                        .attr('x', d => d.x)
                        
                        .attr('y', d => d.y)
                        .attr('width', d => 300)
                        .attr('height', d => 500)
                        .attr("fill", function(d,i) { return "#dc3912"} );

        }
          
}
