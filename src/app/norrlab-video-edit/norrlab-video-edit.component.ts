import { Component, OnInit } from '@angular/core';
import { VideoService} from '../services/video-service/video.service';
import { UserService} from '../services/user-service/user.service'; 
import {FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Router, ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-norrlab-video-edit',
  templateUrl: './norrlab-video-edit.component.html',
  styleUrls: ['./norrlab-video-edit.component.css']
})
export class NorrlabVideoEditComponent implements OnInit {
  videoToUpdate;
  myControlLoc = new FormControl();
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];

optionCategory: string[] = ['FOREX', 'STOCK', 'CFD','FUTURES'];
  norrOptionLocation: string[] = ['Paris', 'Bitam', 'Strasbourg','Abidjan','Dakar','Cairo'];
  tmpVideo:any = new Object();
  constructor(private activatedRoute:ActivatedRoute ,private  videoService:VideoService,private userService:UserService,
    private toastr: ToastrService) { }

 infoDescription(){
 	alert(this.videoToUpdate.videoDescription.length)
 }

 infoTitle(){
 	alert(this.videoToUpdate.videoTitle.length+'||'+this.videoToUpdate.videoTitle)
 }

watchvideo(videoToUpdateId){

}

valideUpdate(video){
    this.videoService.editChannelVideosUserId(video).subscribe(result =>{
      console.log("result")
      console.log(result); 
      this.showSuccess();
    }).catch(err =>{
      alert(err)
    })
}

undoChanges(){
   this.logaPage();
}

saveChanges(video){
  this.valideUpdate(video);
}

showSuccess() {
    this.videoToUpdate;
    this.toastr.success('Changes saved');
}

  ngOnInit() {
  	 this.logaPage();
  }

  logaPage(){
    var videoId = this.activatedRoute.snapshot.params.videoId;
     this.videoService.getVideosToUpdateByUserId(videoId)
     .subscribe( video =>{
       this.videoToUpdate = video; 
       //this.videoToUpdate.videoUrl = undefined;
     },error=>{
       alert("error")
     })
  }

}
