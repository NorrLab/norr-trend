import { Component, OnInit,ViewChild, ElementRef } from '@angular/core'; 


@Component({
  selector: 'app-norrlab-videos',
  templateUrl: './norrlab-videos.component.html',
  styleUrls: ['./norrlab-videos.component.css']
})
export class NorrlabVideosComponent implements OnInit {

  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
   @ViewChild("__upToMin", { static: false }) __upToMin: ElementRef;
  constructor() { }


  playPause(){  
  	console.log(this.videoplayer)
  	if(this.videoplayer.nativeElement.paused)
  		this.videoplayer.nativeElement.play();
  	else
  		this.videoplayer.nativeElement.pause();
  }

  changeVolume(){

  	if(this.videoplayer.nativeElement.muted){

  		this.videoplayer.nativeElement.muted=false;
  	} else{

  		this.videoplayer.nativeElement.muted=true;
  	}
  }

  position__track(){ 
  	var cursorPosition = (this.videoplayer.nativeElement.currentTime * 100)/this.videoplayer.nativeElement.duration;
  	this.__upToMin.nativeElement.style.width=cursorPosition+"%" ;
  }

  ngOnInit() {
  	this.__upToMin.nativeElement.style.width="0%"
 
  } 

  /*

currentTime: 56.68009
duration * 100): 2279.433
  */
}
