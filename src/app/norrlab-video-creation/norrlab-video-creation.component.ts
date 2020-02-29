import { Component, OnInit } from '@angular/core';

declare namespace NorrLabChart{ 
    type NorrLabChartType = 'line' | 'bar' | 'horizontalBar' | 'radar' | 'doughnut' | 'polarArea' | 'bubble' | 'pie' | 'scatter';
  }

@Component({
  selector: 'app-norrlab-video-creation',
  templateUrl: './norrlab-video-creation.component.html',
  styleUrls: ['./norrlab-video-creation.component.scss']
})
export class NorrlabVideoCreationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	type some = 'line' | 'bar' | 'horizontalBar' | 'radar' | 'doughnut' | 'polarArea' | 'bubble' | 'pie' | 'scatter';
  	console.log("some")
  }

}

 