 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NorrlabMaterialModule} from './norrlab-material/norrlab-material.module';
import { NorrlabTradesComponent } from './norrlab-trades/norrlab-trades.component';
import { NorrlabHomeComponent } from './norrlab-home/norrlab-home.component';
import { NorrlabLessonsComponent } from './norrlab-lessons/norrlab-lessons.component';
import { NorrlabVideosComponent } from './norrlab-videos/norrlab-videos.component'; 
import { MatVideoModule } from 'mat-video';
import { NorrlabVideoDialogComponent } from './norrlab-videos/dialog/norrlab-video-dialog/norrlab-video-dialog.component';
import { NorrlabLoginComponent } from './norrlab.login/norrlab.login.component';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { NorrlabDetailTradeComponent } from './norrlab-detail-trade/norrlab-detail-trade.component';
@NgModule({
  declarations: [
    AppComponent,
    NorrlabTradesComponent,
    NorrlabHomeComponent,
    NorrlabLessonsComponent,
    NorrlabVideosComponent,
    NorrlabVideoDialogComponent,
    NorrlabLoginComponent,
    NorrlabDetailTradeComponent,
  ],
  imports: [
    BrowserModule,HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,NorrlabMaterialModule,MatVideoModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
