import { Component, OnInit,ViewChild, ElementRef,AfterViewInit } from '@angular/core'; 
import { UserService} from '../services/user-service/user.service';
import { VideoService} from '../services/video-service/video.service';

import {MatSnackBar} from '@angular/material/snack-bar';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {NorrlabVideoDialogComponent} from './dialog/norrlab-video-dialog/norrlab-video-dialog.component';

import {Router, ActivatedRoute, Params} from '@angular/router';
import { NorrlabNavgationService } from '../norrlab-navgation/norrlab-navgation.service';

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
constructor(private userService: UserService,public dialog: MatDialog,private videoService: VideoService,
  private activatedRoute:ActivatedRoute, private router:Router, private norrlabNavgationService:NorrlabNavgationService) { }


  playPause(){   
  	if(this.videoplayer.nativeElement.paused){ 
      this.videoplayer.nativeElement.play().then(__vd =>{
 
      }).catch(error => {  
      this.videoplayer.nativeElement.play()
    });
      this.norrPlayPause = true;
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
         }


      // this.__matExpansionPanel.opened.emit("closeLoginPopUp");

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
  this.volumePosition = xPosition;
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
      if(param==true && this.userConnecteddYet(this.currentUser)){
          this.videoLikes.like +=1;
        // incremente les like
      }
      else if(this.userConnecteddYet(this.currentUser)){

        this.videoLikes.dislike +=1;
        // incremente les dislike
      } 
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

  valideComment(){
    this.norrlabExpanded = 0;
    this.ableComment = false; 
    }

  cancelComment(){
  }

   matExpansionPanel(event){
     console.log(event);
      return this.ableComment = false;
   }

  playCurrentVideo(param){ 
    this.videoplayer.nativeElement.pause();
    this.getVideoFree(param);
  }  

  upDateNorrLabVideo(param){
    if(param>0)
      this.videoReadayToplay.videoLikes += 1;
    else
      this.videoReadayToplay.videoDislikes += 1;

    this.videoReadayToplay._id = undefined;
    this.videoService.upDateNorrLabVideo(this.videoReadayToplay)
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

  getAllVideoComments(){
    this.videoService.getVideoFree(null,null).subscribe(videos =>{
        this.videoComments = videos;
        this.weekFreeVideos = videos;
      });
  }

  getVideoFree(videoId){
    this.videoService.getVideoFree(videoId,null).subscribe(video =>{ 
        this.videoReadayToplay  = video; 
            this.videoService.setVideo(this.videoReadayToplay)
        this.videoplayer.nativeElement.src =  this.videoReadayToplay.videoUrl;
        this.videoplayer.nativeElement.poster =  this.videoReadayToplay.videoPoster;
        this.videoplayer.nativeElement.title =  this.videoReadayToplay.videoTitle;
        this.videoplayer.nativeElement.pause();
        this.playPause();
      });
  }

  ngOnInit() {
  	this.__upToMin.nativeElement.style.width="0%";  
      this.getVideoFree(this.videoService.getVideo()._id);
    this.getAllVideoComments();
  }  
}
