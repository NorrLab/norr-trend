import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {NorrlabTradesComponent} from './norrlab-trades/norrlab-trades.component';
import {NorrlabHomeComponent} from './norrlab-home/norrlab-home.component';
import {NorrlabLessonsComponent} from './norrlab-lessons/norrlab-lessons.component';
import {NorrlabVideosComponent} from './norrlab-videos/norrlab-videos.component';
import { NorrlabLoginComponent } from './norrlab.login/norrlab.login.component';
import { NorrlabDetailTradeComponent } from './norrlab-detail-trade/norrlab-detail-trade.component';
import { NorrlabVideoEditComponent } from './norrlab-video-edit/norrlab-video-edit.component';
import { NorrlabVideoChannelComponent } from './norrlab-video-channel/norrlab-video-channel.component';
import { NorrlabMemberShipsComponent } from './norrlab-member-ships/norrlab-member-ships.component';
import { NorrlabPositionBublicationComponent } from './norrlab-position-bublication/norrlab-position-bublication.component';
import { NorrlabAccountManagerComponent } from './norrlab-account-manager/norrlab-account-manager.component';
import { NorrlabVideoCreationComponent } from './norrlab-video-creation/norrlab-video-creation.component';
import { NorrlabVideoAnalyticsComponent } from './norrlab-video-analytics/norrlab-video-analytics.component';
import { NorrlabVideoCommentsListComponent } from './norrlab-video-comments-list/norrlab-video-comments-list.component';
import { NorrlabUserComponent } from './norrlab-user/norrlab-user.component';

import { UserProfilComponent } from './user-profil/user-profil.component';
 

const routes: Routes = [{path:'home',component:NorrlabHomeComponent}
	,{path:'lessons',component:NorrlabLessonsComponent}
	,{path:'comments-list/:videoId',component:NorrlabVideoCommentsListComponent},
	{path:'user/:userId',component:NorrlabUserComponent},
	{path:'user-profil/:userId',component:UserProfilComponent},
	{
		path:'videos',component:NorrlabVideosComponent,
	 	children:
	 	[ 
	 		{path:':videoId',component:NorrlabVideosComponent}
	 	]
	}
	,
	{path:'',component:NorrlabHomeComponent}
	,{path:'login',component:NorrlabLoginComponent},
	{path:'login',component:NorrlabLoginComponent}
	,{path:'user-trades/:tradeId/detail',component:NorrlabDetailTradeComponent}
	,{path:'video-creation',component:NorrlabVideoCreationComponent},
	{path:'video/:videoId/analytics',component:NorrlabVideoAnalyticsComponent},
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
	,{path:'videos-edition/:videoId',component:NorrlabVideoEditComponent}
	,{path:'videos-channel/:userId',component:NorrlabVideoChannelComponent}
	,{path:'memberships',component:NorrlabMemberShipsComponent}
	,{path:'position-bublication',component:NorrlabPositionBublicationComponent}
	,{path:'account-manager/:userId',component:NorrlabAccountManagerComponent}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
