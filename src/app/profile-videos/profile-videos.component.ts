import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { UserService} from '../services/user-service/user.service';  
import { VideoService} from '../services/video-service/video.service';  
import { ToastrService } from 'ngx-toastr';
import {Router, ActivatedRoute, Params} from '@angular/router'; 
import { DomSanitizer } from "@angular/platform-browser";
import { DOCUMENT } from '@angular/platform-browser';
import { Inject,Injectable } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes'; 
import {MatChipInputEvent} from '@angular/material';
import { TradesService} from '../services/trades-service/trades.service';
import {environment} from './../../environments/environment.prod'; 

@Component({
  selector: 'app-profile-videos',
  templateUrl: './profile-videos.component.html',
  styleUrls: ['./profile-videos.component.css']
})
export class ProfileVideosComponent implements OnInit {

  constructor(private userService:UserService,private toastrService:ToastrService,private activatedRoute: ActivatedRoute,
    private tradesService:TradesService,private elementRef : ElementRef,
    private videoService:VideoService) { }
  _norrUser;
  _userVideos ;
  picturUsereUrl; 
  totalCount:number;
  //@ViewChild("tradePublication") tradePublication: ElementRef;

  onScrollDown(){
    let tradePublication = this.elementRef.nativeElement.querySelector(`#tradePublication`);
    alert(`${tradePublication.nativeElement.scrollTop()}`); 
  }

  goToVideoPage(publicationId){ 
      window.location.href = `/videos/${publicationId}`;
  }

  loadTrades(e){
    console.log(e);
    this.tradesService.getTradeByUserId(this.activatedRoute.snapshot.params.userId,e.pageIndex,e.pageSize,undefined)
    .subscribe(trade =>{ 
        this._userVideos =  trade.data; 
        this.totalCount = trade.totalCount;
        console.log("this.norrLabTrades") 
        console.log(trade.data) 
    },err=>{
        alert(err)
    });
  }

  ngOnInit() {  
    //window.addEventListener('scroll', this.onScrollDown, true);
  	this.userService.getUserById(this.activatedRoute.snapshot.params.userId)
  	.subscribe(user =>{
  		this._norrUser = user; 
      this.picturUsereUrl = user.userPictureUrl?`${environment.apiUrl}/images${user.userPictureUrl}`:`${environment.apiUrl}/images/default_user.jpg`
      this.videoService.getVideoByUserProfile(user._id,0,6,undefined)
      .subscribe( trades =>{
        this._userVideos =  trades.data;
        this.totalCount = trades.totalCount;
      }) 
  	},err =>{
  		//TODO  getTradeByUserId(userId,pageNumber, nbPerPage,criteria)
  		window.history.back()// https://material.angular.io/assets/img/examples/shiba2.jpg
  	})
  }


  getPicture(publication){
    var picutre = (publication.videoPoster)?`${publication.videoPoster}`:`${environment.apiUrl}/images/default-img.jpg`;
    return picutre;
    //+publication.pictureUrl
  }

  getVideoPoster(publication){
    var picutre = (publication.videoPoster)?`${environment.apiUrl}${publication.videoPoster}`:`${environment.apiUrl}/images/default-img.jpg`;
    return picutre;
    //+publication.pictureUrl
  }

}

