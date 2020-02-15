import { Component, OnInit } from '@angular/core';
import { VideoService} from '../services/video-service/video.service';
import { UserService} from '../services/user-service/user.service'; 

import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-norrlab-video-edit',
  templateUrl: './norrlab-video-edit.component.html',
  styleUrls: ['./norrlab-video-edit.component.css']
})
export class NorrlabVideoEditComponent implements OnInit {
  videoToUpdate;

  constructor(private activatedRoute:ActivatedRoute ,private  videoService:VideoService,private userService:UserService) { }

 
  ngOnInit() {
  	 var videoId = this.activatedRoute.snapshot.params.videoId;
  	 this.videoService.getVideosToUpdateByUserId(videoId)
  	 .subscribe( video =>{
  	 	this.videoToUpdate = video;
  	 },error=>{
  	 	alert("error")
  	 })
  }


}
