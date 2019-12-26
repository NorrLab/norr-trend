import { Component, OnInit,ViewChild, ElementRef,AfterViewInit } from '@angular/core'; 


@Component({
  selector: 'app-norrlab-videos',
  templateUrl: './norrlab-videos.component.html',
  styleUrls: ['./norrlab-videos.component.css']
})
export class NorrlabVideosComponent implements OnInit,AfterViewInit {

@ViewChild("videoPlayer") videoplayer: ElementRef;
@ViewChild("__upToMin") __upToMin: ElementRef;

@ViewChild("__upToMinimumControlProgresse") __upToMinimumControlProgresse: ElementRef;//
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
  	this.norrlab__progress__video = (this.videoplayer.nativeElement.currentTime*100)/this.videoplayer.nativeElement.duration;
  	this.__upToMin.nativeElement.style.width=this.norrlab__progress__video+"%" ; 
  }

  position__track(event){ 
  var bcr = this.__upToMinimumControlProgresse.nativeElement.getBoundingClientRect();

  var xPosition   = Math.min(Math.max(0, (event.clientX - bcr.left) / bcr.width), 1)*100;
  this.__upToMin.nativeElement.style.width=xPosition+"%" ;   
    this.videoplayer.nativeElement.currentTime = Math.round((xPosition*this.videoplayer.nativeElement.duration) / 100) ; 
  }

  ngOnInit() {
  	this.__upToMin.nativeElement.style.width="0%"
 
  } 

  /*

currentTime: 56.68009
duration * 100): 2279.433
  */
}
