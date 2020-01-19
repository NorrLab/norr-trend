import { Component, OnInit } from '@angular/core';
import { TradesService} from '../services/trades-service/trades.service';

@Component({
  selector: 'app-norrlab-detail-trade',
  templateUrl: './norrlab-detail-trade.component.html',
  styleUrls: ['./norrlab-detail-trade.component.css']
})
export class NorrlabDetailTradeComponent implements OnInit {
  public norrlabTrade;
  constructor(private tradesService:TradesService) {
  	this.getTrade('5b859b2d242756c6f8bad47e')
   }

  ngOnInit() {
  	 
  }

  getTrade(tradeId){
  		this.tradesService.getNorrLabTrade(tradeId,{})
  		.subscribe(trade =>{
  			this.norrlabTrade = trade;
  		}, err =>{
  			console.log(err)
  		})
  }

}
