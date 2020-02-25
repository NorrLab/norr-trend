import { Component, OnInit,ViewChild, ElementRef,AfterViewInit } from '@angular/core'; 
import { UserService} from '../services/user-service/user.service';
import { VideoService} from '../services/video-service/video.service';

import { NorrLabVideo} from '../interfaces/norrLabVideo/norr-lab-user';
import {MatSnackBar} from '@angular/material/snack-bar';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {NorrlabVideoDialogComponent} from './dialog/norrlab-video-dialog/norrlab-video-dialog.component';

import {Router, ActivatedRoute, Params} from '@angular/router';
import { NorrlabNavgationService } from '../norrlab-navgation/norrlab-navgation.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { DOCUMENT } from '@angular/platform-browser';
import { Inject,Injectable } from '@angular/core';

const VIDEO_URL= "/videos/";

@Component({
  selector: 'app-norrlab-videos',
  templateUrl: './norrlab-videos.component.html',
  styleUrls: ['./norrlab-videos.component.css']
})
export class NorrlabVideosComponent implements OnInit,AfterViewInit {

@ViewChild("videoPlayer") videoplayer: ElementRef;
@ViewChild("__upToMin") __upToMin: ElementRef;
@ViewChild("__norrlabSignIn") __norrlabSignIn: ElementRef;
@ViewChild("__main_container") __main_container: ElementRef;
@ViewChild("__volumClassProgress") __volumClassProgress: ElementRef;
@ViewChild("__roundVolumControl") __roundVolumControl: ElementRef;
@ViewChild("__volumeClass") __volumeClass: ElementRef;
@ViewChild("__listFreeVideos") __listFreeVideos: ElementRef;
@ViewChild("__signIn") __signIn: ElementRef;
@ViewChild("__checkUser") __checkUser: ElementRef;
@ViewChild("__matExpansionPanel") __matExpansionPanel: ElementRef;
@ViewChild("__boardSocialMedia") __boardSocialMedia: ElementRef;

@ViewChild("__upToMinimumControlProgresse") __upToMinimumControlProgresse: ElementRef;//


norrLabVideoTradeComment;
norrLabVideoTrade;
norrLabTradeComment;
//norrBody = document.querySelector("");
norrlab__progress__video: number;
videoLikes = {
  "likeAuthor":"",
  "dislike":0,
  "like":0
}

//userService:TradesService;
currentUser:any;

norrlabVideo={
  "videoUrl":"http://192.168.1.10:369/norrlab-users-video-2018/test.mp4",//BelattarQuenelleZemmour
  "videoAuthor":0,
  "videoId":0,
  "videoLikes":{},
  "videoPoster":"http://192.168.1.10:369/norrlab-users-video-2018/test.jpg"
}

asRight(){
  return this.userService.getUser();
}

showSignIn = false;
norrPlayPause = false;
volumeMuted = true;
animal: string;
  name: string;
volumePosition :number= 1;
panelOpenState = false;
norrlabExpanded:number = 0;
weekFreeVideos:any = [];
videoReadayToplay;
videoComments:any=[];
ableComment:boolean=false;
videoMapper:any = new Object();
cmt = {
  "videoCommentDescription":"",
  "videoCommentDate":"",
  "videoCommentVideo":"",
  "videoCommentUser":"",
}
__openCmtEdito;
__shareOnSocialMedia;
page ={
  url:""
}
constructor(private userService: UserService,public dialog: MatDialog,private videoService: VideoService,
  private activatedRoute:ActivatedRoute, private router:Router,
  private matIconRegistry:MatIconRegistry, private norrlabNavgationService:NorrlabNavgationService,private domSanitizer:DomSanitizer,
  @Inject(DOCUMENT) private document: any) {
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
  console.log(this.activatedRoute)
  console.log(this.router)
   }

   /* To copy Text from Textbox */
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    setTimeout(() =>{ 
     this.__shareOnSocialMedia = false;
    },1000)
  }


   shareOnSocialMediaNoArg(){
     this.__shareOnSocialMedia = true;
   }

   shareOnSocialMedia(social){
     this.videoService.shareOnSocialMedia(social);
   }

   closeShareVideo(){
     this.__shareOnSocialMedia=false;
   }

  playPause(){   
  	if(this.videoplayer.nativeElement.paused){  
      this.videoplayer.nativeElement.play().then(__vd =>{
         this.norrPlayPause = true;
         console.log("videoPlayed: "+ this.norrPlayPause);
      }).catch(error => {  
                this.videoplayer.nativeElement.play().then(__vd =>{
               console.log("videoPlayed: "+ this.norrPlayPause);
                this.norrPlayPause = true;      
               // this.videoService.upDateViews(this.videoReadayToplay)
            }); 
        }); 
    }
  	else{

      this.videoplayer.nativeElement.pause();
     this.norrPlayPause = false;
    }
  }

  ngAfterViewInit(): void{

       this.__checkUser.nativeElement.onclick = () =>{
        
         this.checkUser()
       }

       this.__checkUser.nativeElement.ontouchend = () =>{
         this.checkUser()
       }
  		this.videoplayer.nativeElement.ontimeupdate = () => {
            this.updateVideo();
   		}  

       /**/this.__main_container.nativeElement.onclick =  (param) => {
           // body...    
            if(this.__signIn.nativeElement.contains( param.target)){

                this.showSignIn=true; 
            }else{
              this.showSignIn=false;
            }   
         }
   		this.avoidControls();
       this.videoplayer.nativeElement.onended =  () =>{
           // body... 
           this.updatePlayerIcon(); 

         this.videoReadayToplay.videoViews +=1;
         this.videoService.upDateViews(this.videoReadayToplay);
         }  
  }


 updatePlayerIcon(){
   this.norrPlayPause = false;
 } 

 changeVolume(event){ 
  var bcr = this.__volumeClass.nativeElement.getBoundingClientRect();

  var xPosition   =  Math.max(0, (event.clientX - bcr.left) / bcr.width)*100;
   
  var aWidth = parseFloat(this.__volumClassProgress.nativeElement.style.width);
  if(xPosition>100){

  this.__volumClassProgress.nativeElement.style.width="100%";
  }else if(xPosition<0){

  this.__volumClassProgress.nativeElement.style.width="0%";
  }else{

  this.__volumClassProgress.nativeElement.style.width=xPosition+"%";
  this.videoplayer.nativeElement.volume= (xPosition/100)
  } 
  this.volumePosition =  xPosition;
  this.videoService.setVolumePosition(this.volumePosition)
}


  muteVolume(){
    console.log("this.videoplayer")
    console.log(this.videoplayer)
  	if(this.videoplayer.nativeElement.muted){

  		this.videoplayer.nativeElement.muted=false;
      this.volumeMuted = true;
      this.__volumClassProgress.nativeElement.style.width=this.volumePosition+"%";
      this.videoplayer.nativeElement.volume= (this.volumePosition/100);
  	} else{
  		this.videoplayer.nativeElement.muted=true;
      this.volumeMuted = false;
      this.__volumClassProgress.nativeElement.style.width="0%";
  	}
  }
  
  avoidControls(){
  	if (this.videoplayer.nativeElement.addEventListener) {
		    this.videoplayer.nativeElement.addEventListener('contextmenu', function(e) {
		        e.preventDefault();
            window.event.returnValue = false;
		    }, false);
		} else {
		    this.videoplayer.nativeElement.attachEvent('oncontextmenu', function() {
		        window.event.returnValue = false;
		    });
		}
  }

   updateVideo(){ 
  	this.norrlab__progress__video = (this.videoplayer.nativeElement.currentTime*100)/this.videoplayer.nativeElement.duration;
  	this.__upToMin.nativeElement.style.width=this.norrlab__progress__video+"%" ; 
  }

  position__track(event){ 
  var bcr = this.__upToMinimumControlProgresse.nativeElement.getBoundingClientRect();

  var xPosition   = Math.min(Math.max(0, (event.clientX - bcr.left) / bcr.width), 1)*100;
  this.__upToMin.nativeElement.style.width=xPosition+"%" ;   
    this.videoplayer.nativeElement.currentTime = Math.round((xPosition*this.videoplayer.nativeElement.duration) / 100) ; 
  }

  openCmtEdito(){
    this.userService.userIsLogged().subscribe(user =>{
        this.__openCmtEdito=false; 
      return true
      }, err =>{ 
        this.__openCmtEdito=true;
        return false
      }); 
  }

  checkUser(){
    if(this.userService.getUser()){
      this.ableComment = false;
    }else{
      
      this.ableComment =true;
    }
    return this.userConnecteddYet(this.currentUser);
  }

  blurSignIn(){
    alert()
  }

  likeVideo(param){  

      this.userService.userIsLogged().subscribe(user =>{  
           
          this.upDateNorrLabVideo(param);
      }, err =>{ 
        this.showSignIn=true;
      });  
  }

  userConnecteddYet(param){
   
    return this.userService.userStatus(param);
  }


openLoginDialog():void {
  
  console.log("NorrlabVideoDialogComponent")
  console.log(NorrlabVideoDialogComponent)
 const dialogRef = this.dialog.open(NorrlabVideoDialogComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });

  }

  goFullScreen(){

      if(this.videoplayer.nativeElement.requestFullscreen){
          this.videoplayer.nativeElement.requestFullscreen()
      }else if(this.videoplayer.nativeElement.webkitRequestFullscreen){
                    this.videoplayer.nativeElement.webkitRequestFullscreen();
      }else if(this.videoplayer.nativeElement.mozRequestFullscreen){
                    this.videoplayer.nativeElement.mozRequestFullscreen(); 
      }else if(this.videoplayer.nativeElement.msRequestFullscreen){
                    this.videoplayer.nativeElement.msRequestFullscreen(); 
      }
  }
  onTextChange(value){
    //this.openCmtEdito();
  }

  valideComment(){  
    this.cmt.videoCommentDescription = this.cmt.videoCommentDescription.trim()
    if(!this.cmt.videoCommentDescription)
      return;
    this.videoService.valideComment(this.cmt)
    .subscribe(cmtR =>{
      console.log("done");
    this.norrlabExpanded = 0;
    this.ableComment = false; 
    this.cmt.videoCommentDescription=""
    });

    }

  cancelComment(){
    this.norrlabExpanded = 0;
    this.ableComment = false; 
  }

   matExpansionPanel(event){
     console.log(event);
      return this.ableComment = false;
   }

  playCurrentVideo(param){ 
    this.videoplayer.nativeElement.pause();
         this.norrPlayPause = false;
     
    //this.getVideoFree(param);
    this.goTo('videos/'+param);
  }  

  upDateNorrLabVideo(param){
    if(param>0)
      this.videoReadayToplay.videoLikes += 1;
    else
      this.videoReadayToplay.videoDislikes += 1; 
    this.videoMapper.video = this.videoReadayToplay;
          this.videoMapper.videoUserLike = {
              norrUser:this.userService.getUser()._id, 
              norrVideo:this.videoReadayToplay._id
            };
    this.videoService.upDateNorrLabVideo(this.videoMapper)
    .subscribe(video =>{
    })
  }

  moreVideosOnDemand(e){
      //TODO REGUEST MORE VIDEO ON RIGHTS
      alert('TODO REGUEST MORE VIDEOs ON RIGHTS')
  }

  getWeekFreeVideos(){
    console.log(this.videoService.getWeekVideos())
    this.weekFreeVideos=this.videoService.getWeekVideos();

    this.videoReadayToplay = this.weekFreeVideos[2];
  }

  getAllVideoComments(videoId) {
    this.videoService.getVideoFree(null,null).subscribe(videos =>{
        this.weekFreeVideos = videos;   
        this.getVideoFree(videoId);
      });
  }

  goTo(destination) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([destination]); 
     // this.getVideoFree(this.activatedRoute.snapshot.params.videoId?this.activatedRoute.snapshot.params.videoId:this.weekFreeVideos[0]._id);
}  

  getVideoFree(videoId){

    if(videoId==undefined && Array.isArray(this.videoService.getVideo())){
          videoId = this.videoService.getVideo()[0]._id;
        }else if(videoId==undefined && this.videoService.getVideo()){
          videoId = this.videoService.getVideo()._id;
    }
    this.videoService.getVideoFree(videoId,null).subscribe(video =>{ 
        if(Array.isArray(video)){
            this.videoReadayToplay  = video[0]; 
        }else{
            this.videoReadayToplay  = video; 
        }


        //TODO get video comments, from video id.
        this.videoService.getVideoFreeComments(this.videoReadayToplay._id).subscribe(comments =>{ 
            this.videoComments = comments;
          });

        this.videoService.setVideo(this.videoReadayToplay)
        this.videoplayer.nativeElement.src =  this.videoReadayToplay.videoUrl;
        this.videoplayer.nativeElement.poster =  this.videoReadayToplay.videoPoster;
        this.videoplayer.nativeElement.title =  this.videoReadayToplay.videoTitle;
        //this.videoplayer.nativeElement.play() 
        //this.playPause();
        
      });
  }

  ngOnInit() {
  	this.__upToMin.nativeElement.style.width="0%";  
    var videoId = this.activatedRoute.snapshot.firstChild?this.activatedRoute.snapshot.firstChild.url[0].path:null;
    this.getAllVideoComments(videoId);
    
    this.volumePosition = this.videoService.getVolumePosition(); 

  this.__volumClassProgress.nativeElement.style.width=(this.videoService.getVolumePosition()?this.videoService.getVolumePosition():100)+"%";
  this.videoplayer.nativeElement.volume= ((this.videoService.getVolumePosition()?this.videoService.getVolumePosition():100)/100) ;
   

  }  
}
