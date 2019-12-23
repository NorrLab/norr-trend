import { Component, OnInit,ViewChild, ElementRef,AfterViewInit } from '@angular/core'; 


@Component({
  selector: 'app-norrlab-videos',
  templateUrl: './norrlab-videos.component.html',
  styleUrls: ['./norrlab-videos.component.css']
})
export class NorrlabVideosComponent implements OnInit,AfterViewInit {

@ViewChild("videoPlayer") videoplayer: ElementRef;
@ViewChild("__upToMin") __upToMin: ElementRef;
norrlab__progress__video: number;
  
  constructor() { }


  playPause(){  
  	console.log(this.videoplayer)
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
  	var time = this.videoplayer.nativeElement.currentTime;
  	this.norrlab__progress__video = (time*100)/this.videoplayer.nativeElement.duration;
  	this.__upToMin.nativeElement.style.width=this.norrlab__progress__video+"%" ; 
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
