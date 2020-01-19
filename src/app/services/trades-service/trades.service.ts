import { Injectable } from '@angular/core';
import {TradesEntity} from '../entities/trade/trades-entity'; 
import { NorrLabTrade} from '../../interfaces/norr-lab-trade'; 
import { NorrLabDetail} from '../../interfaces/norr-lab-detail';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TradesService {
	configNorrLabTradesUrl:string="http://localhost:369/user/free-trades"; 
	configNorrLabTradeUrl:string="http://localhost:369/user/free-trade"; 
	configNorrLabDetailTradeUrl:string="http://localhost:369/user/free-trade-detail"; 
	trades = [];
	
  constructor(private httpClient:HttpClient) { }//private httpParams:HttpParams

  getAllTrades(){

  	console.log(TradesEntity) 

  	
  	this.generateUserTrades(); 
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

  generateUserTrades(){
	  	for(var j = 0; j<8;j++){
	  		var trade:TradesEntity;
			if(j%2==0){
				trade = this.returnRandomTrade(1,j);
			}else{
				trade = this.returnRandomTrade(-1,j);
			}
			if(trade.amout < 0){ 
				trade.class="trade-losses"
			}else{ 
				trade.class="trade-gains"
			}

				this.trades.push(trade);
			}
	  	};

	  	returnRandomTrade( val, j){
		  	if(val>0){
		  		return {
						"id": j,
						"publicationDate": new Date(),
						"description": "chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 236 kB [initial] [rendered]",
						"product": "EUR/USD-"+j,
						"pl": true,
						"author": {
								"id": 1,
								"name": "OSSENE-"+j,
								"lastName": "Ulrich",
								"birth": new Date(),
								"location": "Strasbourg",
								"address": "24 rue des riches", 
							},
						"amout": -500+j,
						"class":"",
						"pictureUrl":"http://localhost:369/norrlab-users-2018/3264aad8ddb03127bb663e1501b982c2"
					};
		  }else{
		  		return {
						"id": j,
						"publicationDate": new Date(),
						"description": "chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 236 kB [initial] [rendered]",
						"product": "EUR/USD-"+j,
						"pl": true,
						"author": {
								"id": 1,
								"name": "OSSENE-"+j,
								"lastName": "Ulrich",
								"birth": new Date(),
								"location": "Strasbourg",
								"address": "24 rue des riches", 
							},
						"amout": 500+j,
						"class":"",
						"pictureUrl":"http://localhost:369/images/default-img.jpg"
					};
		  }
  	}
  }

  
