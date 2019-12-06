import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {NorrlabTradesComponent} from './norrlab-trades/norrlab-trades.component';
import {NorrlabHomeComponent} from './norrlab-home/norrlab-home.component';
import {NorrlabLessonsComponent} from './norrlab-lessons/norrlab-lessons.component';
import {NorrlabVideosComponent} from './norrlab-videos/norrlab-videos.component';

const routes: Routes = [{path:'home',component:NorrlabHomeComponent},{path:'user-trades',component:NorrlabTradesComponent}
	,{path:'lessons',component:NorrlabLessonsComponent},{path:'videos',component:NorrlabVideosComponent},{path:'',component:NorrlabHomeComponent}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
