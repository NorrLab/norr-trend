import { Component, OnInit } from '@angular/core';
import { TradesService} from '../services/trades-service/trades.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NorrLabTradeComment} from '../interfaces/norrLabTradeComment/norr-lab-trade-comment';
import { UserService} from '../services/user-service/user.service';
import { VideoService} from '../services/video-service/video.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NorrLabSnackBarComponentComponent } from '../norr-lab-snack-bar-component/norr-lab-snack-bar-component.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { DOCUMENT } from '@angular/platform-browser';
import { Inject,Injectable } from '@angular/core';
import {SocialService} from '../services/social-media/social.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from './../../environments/environment.prod';


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
   ONLINE_USER;
     page ={
  url:"",description:""
}

socialMediaShare(e){
  return this.socialService.shareOnTwitter("NorrLab reach freedom now!");
}

goToUserProfil(userProfile){
    this.userService.userIsLogged()
    .subscribe(user =>{
      window.location.href=`user-profil/${userProfile._id}`;
    },err =>{
      //this.userService.toastError('You must be connected!');
      window.location.href=`login/`;
    })
}
__env;
    __activedSocialShare;
  constructor(private tradesService:TradesService,private route: ActivatedRoute,
  private router: Router, private userService:UserService,private _snackBar: MatSnackBar
  , private videoService:VideoService,private domSanitizer:DomSanitizer,
  @Inject(DOCUMENT) private document: any,
  private matIconRegistry:MatIconRegistry, private socialService:SocialService) {

   this.__env = environment;
    console.log(environment)
    var tradeId = this.route.snapshot.params.tradeId;
  	this.getTrade(tradeId)
    this.getNorrLabTradeComment(tradeId);
    this.ONLINE_USER = this.userService.getUser();
     this.matIconRegistry.addSvgIcon(
    'icon-twiter',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg/icons8-twitter.svg')
    );
  this.matIconRegistry.addSvgIcon(
    'icon-facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg/icons8-facebook-old.svg')
    );
  this.matIconRegistry.addSvgIcon(
    'icon-linkedin',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg/icons8-linkedin.svg')
    );
  this.matIconRegistry.addSvgIcon(
    'icon-instagram',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/svg/icons8-instagram.svg')
    );
  this.page.url = this.document.location.origin+router.url;

   }

  getPageDescription(description): string{
      if(description.length>0){
        return description.substring(0,30)
      }
      return description;
  }

  openSnackBar() {
    this._snackBar.openFromComponent(NorrLabSnackBarComponentComponent, {
      duration: 5 * 1000,
    });
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/user-trades/'+this.route.snapshot.params.tradeId+'/detail']);
  }

activeSocialShare(){
  this.__activedSocialShare = true;
}

copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    setTimeout(() =>{
     this.__activedSocialShare = false;
    },1000)
  }

closeShareVideo(){
   this.__activedSocialShare = false ;
}

   __cancel(event){
        if(event.target.classList.contains("mat-button-wrapper")){
          this.norrLabTradeCommentComment="";
           this.__isConnected= false;
         }
   }


  ngOnInit() {
  	 console.log(this.route.params)
  }


__twitterShare;
  getTrade(tradeId){

   this.norrlabTradeAnalyses=[];
  		this.tradesService.getNorrLabTrade(tradeId,{})
  		.subscribe(trade =>{
        this.__norrlabTrade = trade;
        if(trade._id)
        this.linkTradeId = trade._id;
        var entries = this.getTradeingAnalyses(trade.tradeDetail.entry,true);
        var managements = this.getTradeingAnalyses(trade.tradeDetail.management, false)

        this.__twitterShare=`https%3A//twitter.com/intent/tweet?text=${this.__norrlabTrade.description}&hashtags=${this.__norrlabTrade.product};
                                                      &url=https%3A//localhost:4200/user-trades/5b859b2d242756c6f8bad47e/detail&via=NorrLab&related=NorrLab`

        this.norrlabTradeAnalyses.push(entries[0]);
        this.norrlabTradeAnalyses.push(entries[1]);
        this.page.description = this.getPageDescription(this.__norrlabTrade.description)
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
if(!this.norrLabTradeCommentComment.trim())
  return;
  this.userService.userIsLogged().subscribe(user =>{
      this.norrLabTradeComment.comment = this.norrLabTradeCommentComment;
      this.norrLabTradeComment.commentTrade = this.videoService.getVideo()._id;
      this.norrLabTradeComment.commentUser = user._id;
      this.tradesService.createNorrLabTradeComment(this.norrLabTradeComment)
      .subscribe(comment =>{
         this.norrLabTradeCommentComment="";
          this.__isConnected= false;
        this.getNorrLabTradeComment(this.videoService.getVideo()._id,)
      })
  }, err =>{
    alert("U must be connected!");
    this.openSnackBar() ;
  });
}

 likeTrade(param){
      console.log(this.__norrlabTrade)
      this.userService.userIsLogged().subscribe(user =>{
          if(this.__norrlabTrade.norrlabTradeLikes==undefined && this.__norrlabTrade.norrlabTradeDislikes==undefined){
              this.__norrlabTrade.norrlabTradeLikes = 0;
              this.__norrlabTrade.norrlabTradeDislikes = 0;
          }

          if(param>0){
            this.__norrlabTrade.norrlabTradeLikes +=1;
          }else{
            this.__norrlabTrade.norrlabTradeDislikes +=1;
          }
          this.tradesService.upTradeDetail(this.__norrlabTrade)
          .subscribe(trade =>{
            console.log(trade)
          })
          this.upDateNorrLabTrade(param);
      }, err =>{
       window.location.href = `/login`
      });
  }

upDateNorrLabTrade(param){

}

isDisabled(): boolean{
if(this.norrLabTradeCommentComment.trim().length>350){
    return true;
}
  return this.__isConnected && (this.norrLabTradeCommentComment.trim().length==0 )
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
     window.location.href = '/login'
    }
    return this.__isConnected;
  }

  onSearchChange(data){
    this.userService.userIsLogged().subscribe(user =>{
               this.__isConnected = true;
           },err=>{
             this.__isConnected = false;
           })
  }

}
