import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {NorrlabTradesComponent} from './norrlab-trades/norrlab-trades.component';
import {NorrlabHomeComponent} from './norrlab-home/norrlab-home.component';
import {NorrlabLessonsComponent} from './norrlab-lessons/norrlab-lessons.component';
import {NorrlabVideosComponent} from './norrlab-videos/norrlab-videos.component';
import { NorrlabLoginComponent } from './norrlab.login/norrlab.login.component';
import { NorrlabDetailTradeComponent } from './norrlab-detail-trade/norrlab-detail-trade.component';

const routes: Routes = [{path:'home',component:NorrlabHomeComponent}
	,{path:'lessons',component:NorrlabLessonsComponent},{path:'videos',component:NorrlabVideosComponent},
	{path:'',component:NorrlabHomeComponent}
	,{path:'login',component:NorrlabLoginComponent},
	{path:'login',component:NorrlabLoginComponent}
	,{path:'user-trades/:tradeId/detail',component:NorrlabDetailTradeComponent},
	{
		path:'user-trades',component:NorrlabTradesComponent,
	 	children:
	 	[
/*
	 		{path:'user-trades/:tradeId/daily',component:NorrlabLoginComponent},
	 		{path:'user-trades/:tradeId/hourly',component:NorrlabLoginComponent},
	 		{path:'user-trades/:tradeId/managin',component:NorrlabLoginComponent} */
	 	]
	 }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
