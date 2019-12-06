 
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

@NgModule({
  declarations: [
    AppComponent,
    NorrlabTradesComponent,
    NorrlabHomeComponent,
    NorrlabLessonsComponent,
    NorrlabVideosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,NorrlabMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
