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
  topWeekVideo;
  norrLabTrades;
  constructor(private tradesService: TradesService, private videoService: VideoService) { } 
	
  
  ngOnInit() { 
  	this.trades =this.tradesService.getAllTrades();
    
  	this.topWeekVideo = this.videoService.getVideoSrc(3);
    this.getNorrLabTrades(1,6);
  }

  // MatPaginator Output

  getNorrLabTrades(pageNumber, nbPerPage){
    this.tradesService.getNorrLabTrades(pageNumber, nbPerPage).subscribe(trade =>{ 
        this.norrLabTrades =  trade;
        console.log("this.norrLabTrades") 
        console.log(trade.data[0].profit) 
    },err=>{
        alert(err)
    });
  }

  loadTraeds(e){
    console.log(e);
    this.tradesService.getNorrLabTrades(e.pageIndex,e.pageSize).subscribe(trade =>{ 
        this.norrLabTrades =  trade;
        console.log("this.norrLabTrades") 
        console.log(trade.data[0].profit) 
    },err=>{
        alert(err)
    });
  }

}
