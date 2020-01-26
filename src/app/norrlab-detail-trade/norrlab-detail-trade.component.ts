import { Component, OnInit } from '@angular/core';
import { TradesService} from '../services/trades-service/trades.service'; 
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NorrLabTradeComment} from '../interfaces/norrLabTradeComment/norr-lab-trade-comment'; 
import { UserService} from '../services/user-service/user.service';

@Component({
  selector: 'app-norrlab-detail-trade',
  templateUrl: './norrlab-detail-trade.component.html',
  styleUrls: ['./norrlab-detail-trade.component.css']
})
export class NorrlabDetailTradeComponent implements OnInit {
   __norrlabTrade;
   norrlabTradeAnalyses=[];
  linkTradeId;
  __marginTop;
  tradeComments= [];
  norrLabTradeComment= {} as NorrLabTradeComment;
  norrLabTradeCommentComment = "";
  __isConnected= false;
  constructor(private tradesService:TradesService,private route: ActivatedRoute,
  private router: Router, private userService:UserService) {
    console.log(this.route)
    console.log(this.route) 
    
  	this.getTrade(this.getTradeId())
    this.getNorrLabTradeComment(this.getTradeId())
   }

   alertNorr(){
     alert()
   }

   norrLabTradeCommentX(){
     this.norrLabTradeCommentComment="";
      this.__isConnected= false;
   }

   getTradeId(){
     return this.route.snapshot.paramMap.params['tradeId']; 
   }

  ngOnInit() {
  	 console.log(this.route.params)
  }

  getTrade(tradeId){

   this.norrlabTradeAnalyses=[];
  		this.tradesService.getNorrLabTrade(tradeId,{})
  		.subscribe(trade =>{
        this.__norrlabTrade = trade;
        if(trade._id)
        this.linkTradeId = trade._id;
        var entries = this.getTradeingAnalyses(trade.tradeDetail.entry,true);
        var managements = this.getTradeingAnalyses(trade.tradeDetail.management, false)
         
        this.norrlabTradeAnalyses.push(entries[0]);
        this.norrlabTradeAnalyses.push(entries[1]);
        
        this.norrlabTradeAnalyses.push(managements[0]);
      this.norrlabTradeAnalyses.push(managements[1]);
        if(this.norrlabTradeAnalyses.length>0){
          var elm = document.getElementById('col_12_main_container');
          elm.style.marginTop = '36px'; 
        }else{
          elm.style.marginTop = '0px'; 
        }

        console.log(this.norrlabTradeAnalyses )
  		}, err =>{
  			console.log(err)
  		})
  };
getNorrLabTradeComment(tradeId){
  this.tradeComments =[]
  this.tradesService.getNorrLabTradeComment(tradeId)
  .subscribe(comments =>{
    this.tradeComments = comments;
  })
}
  showAnalyse(analyse){
    if(analyse.pictureUrl==''){

      this.__norrlabTrade.pictureUrl='/images/default-img.jpg';
    }else{
       this.__norrlabTrade.pictureUrl = analyse.pictureUrl; 
    }
    this.__norrlabTrade.description = analyse.description;
  }
createNorrLabTradeComment(){ 
  this.userService.userIsLogged().subscribe(user =>{
      this.norrLabTradeComment.comment = this.norrLabTradeCommentComment;
      this.norrLabTradeComment.commentTrade = this.getTradeId();
      this.norrLabTradeComment.commentUser = user._id;
      this.tradesService.createNorrLabTradeComment(this.norrLabTradeComment)
      .subscribe(comment =>{
         this.norrLabTradeCommentComment="";
          this.__isConnected= false;
        this.getNorrLabTradeComment(this.getTradeId(),)
      })
  }, err =>{
    alert("U must be connected!")
  });

  /*this.norrLabTradeComment.comment = this.norrLabTradeCommentComment;
  this.norrLabTradeComment.commentTrade = this.getTradeId();
  this.tradesService.createNorrLabTradeComment(this.norrLabTradeComment)
  .subscribe(comment =>{
     this.norrLabTradeCommentComment="";
      this.__isConnected= false;
    this.getNorrLabTradeComment(this.getTradeId(),)
  })*/
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

  isConnected(userId){
    if(this.userService.userIsLogged()){
      this.__isConnected = true;
    }else{
      this.__isConnected = false;
    }
    return this.__isConnected;
  }

  onSearchChange(data){ 
    return this.isConnected(data);
  }

}
