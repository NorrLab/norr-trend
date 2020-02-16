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
  myControlLoc:FormControl;
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  recordingDate: FormControl;

  optionCategory: string[] = ['FOREX', 'STOCK', 'CFD','FUTURES'];
  norrOptionLocation: string[] = ['Paris', 'Bitam', 'Strasbourg','Abidjan','Dakar','Cairo'];
  tmpVideo:any = new Object();
  selected;
  
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
    },err =>{
      this.showError();
    })
}

undoChanges(){
    alert(this.videoToUpdate.recordingDate)
   this.logaPage();
}

saveChanges(video){
  video.public = this.selected=='Subscribers'?false:true;
  this.valideUpdate(video);
}

showError(){
    this.toastr.success('Erros!');
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
       console.log("video")
       console.log(video)
       this.videoToUpdate = video; 
       this.selected = video.public?'Public':'Subscribers';
       this.recordingDate = new FormControl(video.recordingDate) ;
       this.myControlLoc = new FormControl(video.videoLocation);
       //this.videoToUpdate.videoUrl = undefined;
       console.log('this.recordingDate')
       console.log(this.recordingDate) 
     },error=>{
       alert("error")
     })
  }

}
