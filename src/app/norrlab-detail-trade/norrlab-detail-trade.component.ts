import { Component, OnInit } from '@angular/core';
import { TradesService} from '../services/trades-service/trades.service';
import { ActivatedRoute }     from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-norrlab-detail-trade',
  templateUrl: './norrlab-detail-trade.component.html',
  styleUrls: ['./norrlab-detail-trade.component.css']
})
export class NorrlabDetailTradeComponent implements OnInit {
   __norrlabTrade;
   norrlabTradeAnalyses=[];
  constructor(private tradesService:TradesService,private route: ActivatedRoute,
  private router: Router) {
    console.log(this.route)
    console.log(this.route)
 
   var tradeId = this.route.snapshot.paramMap.params.tradeId; 
   console.log(this.route.snapshot.paramMap)
  	this.getTrade(tradeId)
   }

  ngOnInit() {
  	 console.log(this.route.params)
  }

  getTrade(tradeId){

   this.norrlabTradeAnalyses=[];
  		this.tradesService.getNorrLabTrade(tradeId,{})
  		.subscribe(trade =>{
        this.__norrlabTrade = trade;
        var entries = this.getTradeingAnalyses(trade.tradeDetail.entry,true);
        var managements = this.getTradeingAnalyses(trade.tradeDetail.management, false)
         
          this.norrlabTradeAnalyses.push(entries[0]);
        this.norrlabTradeAnalyses.push(entries[1]);
        
        this.norrlabTradeAnalyses.push(managements[0]);
      this.norrlabTradeAnalyses.push(managements[1]);
        

        console.log(this.norrlabTradeAnalyses )
  		}, err =>{
  			console.log(err)
  		})
  };

  getTradeingAnalyses(entry,state){

     return Object.keys(entry).map( function (key) {
      // body...
      if(key=="daily"){
        if(state)
          entry[key].title= "Daily entry"
        else
          entry[key].title= "Daily management"
      } 
      if( key=="hourly"){
        if(state)
          entry[key].title= "Hourly entry"
        else
          entry[key].title= "Hourly management"
      }  

      return entry[key]

    });

  }

}
