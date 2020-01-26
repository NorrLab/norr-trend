import { Injectable } from '@angular/core';
import {TradesEntity} from '../entities/trade/trades-entity'; 
import { NorrLabTrade} from '../../interfaces/norr-lab-trade'; 
import { NorrLabDetail} from '../../interfaces/norr-lab-detail';
import { NorrLabTradeComment} from '../../interfaces/norrLabTradeComment/norr-lab-trade-comment';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TradesService {
	configNorrLabTradesUrl:string="http://localhost:369/user/free-trades"; 
	configNorrLabTradeUrl:string="http://localhost:369/user/free-trade"; 
	configNorrLabDetailTradeUrl:string="http://localhost:369/user/free-trade-detail"; 
	configNorrLabTradeCommentUrl:string = "http://localhost:369/user/free-trade-comment"; 
	trades = []; 
	
  constructor(private httpClient:HttpClient) { }//private httpParams:HttpParams

  getAllTrades(){

  	console.log(TradesEntity)  
  	return this.trades;
  }

  getTradeDetail(tradeId){
  		//TODO GET URL FROM  ENV 
  	const params = new HttpParams()
	.set('tradeId', tradeId)/*
    .set('nbPerPage', nbPerPage)
    .set('criteria', criteria) */
  		return this.httpClient.get<NorrLabDetail>(this.configNorrLabDetailTradeUrl);
  }

  getNorrLabTrades(pageNumber, nbPerPage,criteria){
  	//TODO GET URL FROM  ENV 
  	const params = new HttpParams()
	.set('pageNumber', pageNumber)
    .set('nbPerPage', nbPerPage)
    .set('criteria', criteria) 
	return this.httpClient.get<NorrLabTrade>(this.configNorrLabTradesUrl,{params})
  }

  getNorrLabTrade(tradeId, user){
  	//TODO GET URL FROM  ENV 
  	const params = new HttpParams()
	.set('tradeId', tradeId)
    .set('email', user.email)
    .set('password', user.password) 
	return this.httpClient.get<NorrLabTrade>(this.configNorrLabTradeUrl,{params})
  }

  getNorrLabTradeComment(tradeId){
  	//TODO GET URL FROM  ENV 
  	const params = new HttpParams()
	.set('tradeId', tradeId) 
	return this.httpClient.get<NorrLabTradeComment[]>(this.configNorrLabTradeCommentUrl,{params})
  }

  createNorrLabTradeComment(norrLabTradeComment){
  	//TODO GET URL FROM  ENV 
  	//const params = new HttpParams()
	//.set('tradeId', tradeId)   

	return this.httpClient.post<NorrLabTradeComment>(this.configNorrLabTradeCommentUrl,norrLabTradeComment)
  };

 
  }

  
