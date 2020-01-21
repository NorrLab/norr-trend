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
  linkTradeId;
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
        
        this.linkTradeId = trade._id;
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

  showAnalyse(analyse){
    if(analyse.pictureUrl==''){

      this.__norrlabTrade.pictureUrl='/images/default-img.jpg';
    }else{
       this.__norrlabTrade.pictureUrl = analyse.pictureUrl; 
    }
    this.__norrlabTrade.description = analyse.description;
  }

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
        //entry[key]._id = entry._id;
        if(state)
          entry[key].title= "Hourly entry"
        else
          entry[key].title= "Hourly management"
      }  

      return entry[key]

    });

  }

}
