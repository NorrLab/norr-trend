import { Component, OnInit } from '@angular/core';
import { TradesService} from '../services/trades-service/trades.service';
import { VideoService} from '../services/video-service/video.service';
//import { NorrLabTrade} from '../interfaces/norr-lab-trade';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-norrlab-trades',
  templateUrl: './norrlab-trades.component.html',
  styleUrls: ['./norrlab-trades.component.css']
})
export class NorrlabTradesComponent implements OnInit {

//@ViewChild("__paginator") __paginator: ElementRef;
  trades; 
  topWeekVideo = {};
  norrLabTrades;
  sortBy:Boolean =  false; 
  sortCriteria:String="";

  constructor(private tradesService: TradesService, private videoService: VideoService) { 
      
    this.getNorrLabTrades(0,5,null);
  } 
	
  __sortBy(){
    this.sortBy = ! this.sortBy;
  }

  __sortByEvent(event){ 
    this.sortCriteria = event.target.innerHTML;
    this.sortBy = false;
    this.getNorrLabTrades(0, 5,this.sortCriteria);
  }

  ngOnInit() { 
  	this.trades =this.tradesService.getAllTrades();
    
  	this.videoService.getVideoFree(null,1).subscribe(video =>{
        this.topWeekVideo = video;
      });;
  }

  // MatPaginator Output

  getNorrLabTrades(pageNumber, nbPerPage,criteria){
    this.tradesService.getNorrLabTrades(pageNumber, nbPerPage,criteria).subscribe(trade =>{ 
        this.norrLabTrades =  trade; 
        console.log("this.norrLabTrades") 
        console.log(this.norrLabTrades.data) 
    },err=>{
        alert(err)
    });
  }

  loadTraeds(e){
    console.log(e);
    this.tradesService.getNorrLabTrades(e.pageIndex,e.pageSize,this.sortCriteria).subscribe(trade =>{ 
        this.norrLabTrades =  trade; 
        console.log("this.norrLabTrades") 
        console.log(trade.data) 
    },err=>{
        alert(err)
    });
  }

}
