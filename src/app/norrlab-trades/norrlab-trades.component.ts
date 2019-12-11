import { Component, OnInit } from '@angular/core';
import { TradesService} from '../services/trades-service/trades.service';

@Component({
  selector: 'app-norrlab-trades',
  templateUrl: './norrlab-trades.component.html',
  styleUrls: ['./norrlab-trades.component.css']
})
export class NorrlabTradesComponent implements OnInit {
  trades; 
  constructor(private tradesService: TradesService) { } 
	
  
  ngOnInit() { 
  	this.trades =this.tradesService.getAllTrades();
  }

}
