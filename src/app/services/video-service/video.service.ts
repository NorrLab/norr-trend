import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
	
	norrlabVideo:any;
	norrlabVideos:any=[];
  constructor() { }

  getVideoSrc(param){
  	this.norrlabVideo={
	  "videoUrl":"",//BelattarQuenelleZemmour
	  "videoAuthor":0,
	  "videoId":0,
	  "videoLikes":{},
	  "videoPoster":""
	}
	  	if(param == 1){
	  		this.norrlabVideo.videoId=1; 
	  		this.norrlabVideo.videoUrl = "http://192.168.1.10:369/norrlab-users-video-2018/test.mp4";
	  		this.norrlabVideo.videoPoster = "http://192.168.1.10:369/norrlab-users-video-2018/test.jpg"; 
	  	}else if(param == 2){
	  		this.norrlabVideo.videoId=2;
	  		this.norrlabVideo.videoUrl = "http://192.168.1.10:369/norrlab-users-video-2018/fondamentaux-du-trading-chapitre-1.mp4";
	  		this.norrlabVideo.videoPoster = "http://192.168.1.10:369/norrlab-users-video-2018/fondamentaux-du-trading-chapitre-1.jpg";
	  	}else if(param == 3) {
	  		this.norrlabVideo.videoId=3;
	  		this.norrlabVideo.videoUrl = "http://192.168.1.10:369/norrlab-users-video-2018/BelattarQuenelleZemmour.mp4";
	  		this.norrlabVideo.videoPoster = "http://192.168.1.10:369/norrlab-users-video-2018/BelattarQuenelleZemmour.jpg";
	  	}
	  	return this.norrlabVideo;
  }

  getWeekVideos(){
  	this.norrlabVideos = []  
  	for(var j=1;j<=3;j++){
  		this.norrlabVideos.push(this.getVideoSrc(j))
  	}
  	return this.norrlabVideos;
  }

}
