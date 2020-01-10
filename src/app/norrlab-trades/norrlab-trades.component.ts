import { Component, OnInit } from '@angular/core';
import { TradesService} from '../services/trades-service/trades.service';
import { VideoService} from '../services/video-service/video.service';

@Component({
  selector: 'app-norrlab-trades',
  templateUrl: './norrlab-trades.component.html',
  styleUrls: ['./norrlab-trades.component.css']
})
export class NorrlabTradesComponent implements OnInit {
  trades; 
  topWeekVideo;
  constructor(private tradesService: TradesService, private videoService: VideoService) { } 
	
  
  ngOnInit() { 
  	this.trades =this.tradesService.getAllTrades();
  	this.topWeekVideo = this.videoService.getVideoSrc(3);
  }

}
