import { Component, OnInit } from '@angular/core';
import { TradesService} from '../services/trades-service/trades.service';
import { VideoService} from '../services/video-service/video.service';
//import { NorrLabTrade} from '../interfaces/norr-lab-trade';
import {PageEvent} from '@angular/material/paginator';
import { NorrlabNavgationService } from '../norrlab-navgation/norrlab-navgation.service';

const VIDEO_URL= "/videos";

@Component({
  selector: 'app-norrlab-trades',
  templateUrl: './norrlab-trades.component.html',
  styleUrls: ['./norrlab-trades.component.css']
})
export class NorrlabTradesComponent implements OnInit {

//@ViewChild("__paginator") __paginator: ElementRef;
  trades; 
  topWeekVideo = {};
  norrLabTrades={} ;
  sortBy:Boolean =  false; 
  sortCriteria:String="";

  constructor(private tradesService: TradesService, private videoService: VideoService,
    private norrlabNavgationService:NorrlabNavgationService) { 
     
    this.getNorrLabTrades(0,5,null);
    this.videoService.getVideoFree(null,1).subscribe(video =>{
        this.topWeekVideo = video;
      });
  } 
	
  goToVideoPage(videoId){

    this.videoService.setVideo(undefined);
    this.videoService.setVideo(this.topWeekVideo);
    this.norrlabNavgationService.goToNextUrl(VIDEO_URL);
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
  }

  // MatPaginator Output

  getNorrLabTrades(pageNumber, nbPerPage,criteria){
    this.tradesService.getNorrLabTrades(pageNumber, nbPerPage,criteria).subscribe(trade =>{ 
        this.norrLabTrades =  trade;  
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
