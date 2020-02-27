
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
import { NorrLabSnackBarComponentComponent } from './norr-lab-snack-bar-component/norr-lab-snack-bar-component.component';
import { NorrlabVideoEditComponent } from './norrlab-video-edit/norrlab-video-edit.component';
import { NorrlabVideoChannelComponent } from './norrlab-video-channel/norrlab-video-channel.component';
import { NorrlabTradePublicationComponent } from './norrlab-trade-publication/norrlab-trade-publication.component';
import { NorrlabMemberShipsComponent } from './norrlab-member-ships/norrlab-member-ships.component';
import { NorrlabPositionBublicationComponent } from './norrlab-position-bublication/norrlab-position-bublication.component';
import { NorrlabAccountManagerComponent } from './norrlab-account-manager/norrlab-account-manager.component';
import { ToastrModule } from 'ngx-toastr';
import { NorrlabVideoCreationComponent } from './norrlab-video-creation/norrlab-video-creation.component';


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
    NorrLabSnackBarComponentComponent,
    NorrlabVideoEditComponent,
    NorrlabVideoChannelComponent,
    NorrlabTradePublicationComponent,
    NorrlabMemberShipsComponent,
    NorrlabPositionBublicationComponent,
    NorrlabAccountManagerComponent,
    NorrlabVideoCreationComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,NorrlabMaterialModule,MatVideoModule,FormsModule,ToastrModule.forRoot({
    timeOut: 1000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    toastClass:'norr-ngx-toastr'
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
