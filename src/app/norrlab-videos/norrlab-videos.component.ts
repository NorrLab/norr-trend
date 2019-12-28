import { Component, OnInit,ViewChild, ElementRef,AfterViewInit } from '@angular/core'; 
import { UserService} from '../services/user-service/user.service';

import {MatSnackBar} from '@angular/material/snack-bar';


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

@ViewChild("__upToMinimumControlProgresse") __upToMinimumControlProgresse: ElementRef;//


norrlab__progress__video: number;
videoLikes = {
  "likeAuthor":"",
  "dislike":0,
  "like":0
}

//userService:TradesService;
currentUser:any;

norrlabVideo={
  "videoUrl":"http://192.168.1.10:369/norrlab-users-video-2018/BelattarQuenelleZemmour.mp4",
  "videoAuthor":0,
  "videoId":0,
  "videoLikes":{},
}

showSignIn = false;

constructor(private userService:UserService) { }


  playPause(){   
  	if(this.videoplayer.nativeElement.paused)
  		this.videoplayer.nativeElement.play();
  	else
  		this.videoplayer.nativeElement.pause();
  }

  ngAfterViewInit(): void{
  		this.videoplayer.nativeElement.ontimeupdate = () => {
            this.updateVideo();
   		}  
   		this.avoidControls();
  }

  changeVolume(){

  	if(this.videoplayer.nativeElement.muted){

  		this.videoplayer.nativeElement.muted=false;
  	} else{

  		this.videoplayer.nativeElement.muted=true;
  	}
  }
  
  avoidControls(){
  	if (this.videoplayer.nativeElement.addEventListener) {
		    this.videoplayer.nativeElement.addEventListener('contextmenu', function(e) {
		        e.preventDefault();
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
 


  likerVideo(param){ 

      if(param==true && this.userNotLikedYet(this.currentUser)){
          this.videoLikes.like +=1;
        // incremente les like
      }
      else if(this.userNotLikedYet(this.currentUser)){

        this.videoLikes.dislike +=1;
        // incremente les dislike
      }else{
        this.showSignIn = true;
         console.log(
      )
         this.__main_container.nativeElement.onclick = function (argument) {
           // body...
           alert("clicked showSignIn: "+this.showSignIn)
        this.showSignIn = false;
         }
      }
  }

  userNotLikedYet(param){
   
    return this.userService.userStatus(param);
  }

  ngOnInit() {
  	this.__upToMin.nativeElement.style.width="0%"
 
  } 

  /*

currentTime: 56.68009
duration * 100): 2279.433
  */
}
