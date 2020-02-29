import { Component, OnInit, ViewChild  } from '@angular/core';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

import { VideoService} from '../services/video-service/video.service';
import { UserService} from '../services/user-service/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router'; 


@Component({
  selector: 'app-norrlab-video-analytics',
  templateUrl: './norrlab-video-analytics.component.html',
  styleUrls: ['./norrlab-video-analytics.component.css']
})
export class NorrlabVideoAnalyticsComponent implements OnInit {


  constructor(private userService:UserService,private activatedRoute:ActivatedRoute,private videoService:VideoService) {

  }

  public lineChartData: ChartDataSets[] = [
   
    { data: [{y:3,x:new Date("1990-01-01")},{y:5,x:new Date("1990-01-02")},{y:9,x:new Date("1991-01-01")},{y:65,x:new Date("2011-01-01")}, {y:35,x:new Date("2011-02-01")},{y:6,x:new Date("2011-06-01")} ], label: 'Series C', yAxisID: 'y-axis-0' },
     
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) ;
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(188, 240, 213, 0.67)',
      borderColor: '#8EE1B6',
      pointBackgroundColor: '#8EE1B6',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      pointBorderWidth:2,
      borderWidth:1
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild('baseChart'/* BaseChartDirective, { static: true }*/) chart: BaseChartDirective;
    norrLabAnalytics : [] = [];
  ngOnInit() { 
  	this.videoService.getVideoAnalytics(this.activatedRoute.snapshot.params.videoId)
    .subscribe(analytics =>{
        var tmpDatas:[] =[];
          this.lineChartOptions = {
    responsive: true,
    scales: {
      bounds:true,
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
            type: 'time', 
            time: {
                unit: 'month',
                min:analytics[0].viewedDate
            },
       
        }],
      yAxes: [

        {
          id: 'y-axis-0',
          position: 'left',
        } 
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: new Date("1995-01-01"),
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: 50,
          borderColor: 'green',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'blue',
            content: 'NorrLab'
          }
        },
      ],
    },
  };
        analytics.forEach((analytic,i) =>{  
            const item = {
                x:new Date(analytic.viewedDate) ,y:analytic.count
            }   
              this.lineChartData[0].data[i] = item;
        }) 
    })
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  public goToComment(): void{
    
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
    alert()
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public pushOne() {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`Label ${this.lineChartLabels.length}`);
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }
}
