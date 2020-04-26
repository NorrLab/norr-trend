import { Component, OnInit, ViewChild  } from '@angular/core';

//import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as pluginZoom from 'chartjs-plugin-zoom';

import { VideoService} from '../services/video-service/video.service';
import { UserService} from '../services/user-service/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NorrlabNavgationService } from '../norrlab-navgation/norrlab-navgation.service';



@Component({
  selector: 'app-norrlab-video-analytics',
  templateUrl: './norrlab-video-analytics.component.html',
  styleUrls: ['./norrlab-video-analytics.component.css']
})
export class NorrlabVideoAnalyticsComponent implements OnInit {

  ngOnInit(){
  }
/*

  constructor(private userService:UserService,private activatedRoute:ActivatedRoute,private videoService:VideoService,
    private norrlabNavgationService:NorrlabNavgationService) {

  }

public lineChartData: ChartDataSets[] = [

    { data: [ ],
     label: 'Views', yAxisID: 'y-axis-0',fill: true

     },

  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  //public lineChartOptions: (ChartOptions & { plugins: any }) ;
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
  public lineChartPlugins = [pluginAnnotations,pluginZoom];

  public year = 'red';//"'#8EE1B6'"

  public order: string = 'value';

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;


    norrLabAnalytics : [] = [];
    countries;

  ngOnInit() {
  	this.videoService.getVideoAnalytics(this.activatedRoute.snapshot.params.videoId)
    .subscribe(analytics =>{
        var tmpDatas:[];

        this.countries =[
            {
               name:"France",
               value:78
            },
            {
               name:"Canada",
               value:1
            },
            {
               name:"New-Yourk",
               value:10
            },
            {
               name:"Pekin",
               value:9
            },
        ]

        this.lineChartOptions = {

    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
            type: 'time',
            time: {
                unit: 'year',
                displayFormats: { month: 'MM' },

            },
            ticks:{
                min:analytics[0]?new Date(analytics[0].viewedDate):new Date("2020-04-03T01:12:53.298+00:00"),

            }

        }],
      yAxes: [

        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    plugins: {
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
    zoom: {
                // Container for pan options
                pan: {
                    // Boolean to enable panning
                    enabled: true,

                    // Panning directions. Remove the appropriate direction to disable
                    // Eg. 'y' would only allow panning in the y direction
                    mode: 'x'
                },

                // Container for zoom options
                zoom: {
                    // Boolean to enable zooming
                    enabled: true,

                    // Zooming directions. Remove the appropriate direction to disable
                    // Eg. 'y' would only allow zooming in the y direction
                    mode: 'x',
                }
            },
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

  public updateChartYear(){

  }

  public updateChartMonth(){

  }

  public updateChartDay(){
    this.lineChartOptions.scales.xAxes[0].time.unit='day';
    this.lineChartOptions.scales.xAxes[0].ticks.min="1990-04-01"
    this.chart.update();
  }

  public goToVideoComment(): void{
      this.norrlabNavgationService.goTo('/videos/'+this.activatedRoute.snapshot.params.videoId)
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
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
      //TODO update data
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
  }*/
}
