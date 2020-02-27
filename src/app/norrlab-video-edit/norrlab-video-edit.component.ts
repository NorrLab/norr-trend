import { Component, OnInit } from '@angular/core';
import { VideoService} from '../services/video-service/video.service';
import { UserService} from '../services/user-service/user.service';  
import { ToastrService } from 'ngx-toastr';
import {Router, ActivatedRoute, Params} from '@angular/router'; 
import { DomSanitizer } from "@angular/platform-browser";
import { DOCUMENT } from '@angular/platform-browser';
import { Inject,Injectable } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes'; 
import {MatChipInputEvent} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';


export interface Tag{
  name:string,
  _id:any,
  videoId:any
}

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
  tags: Tag[] = [
  ];

  //Tags chips
  removable = true;
newTag = new FormControl([]);
  group = new FormGroup({
    newTag: this.newTag
  })
  readonly separatorKeysCodes: number[] = [ENTER, COMMA]; 

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({
        name:value.toUpperCase().trim(),
        _id:undefined,
        videoId:this.activatedRoute.snapshot.params.videoId
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.newTag.setValue(this.tags);
  }

  remove(fruit: Tag): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.newTag.setValue(this.tags);
  }
//Tags end
  recordingDate: FormControl;
  

  optionCategory: string[] = ['FOREX', 'STOCK', 'CFD','FUTURES'];
  norrOptionLocation: string[] = ['Paris', 'Bitam', 'Strasbourg','Abidjan','Dakar','Cairo'];
  tmpVideo:any = new Object();
  selected;
  page = {url:""}

  constructor(private activatedRoute:ActivatedRoute ,private  videoService:VideoService,private userService:UserService,
    private toastr: ToastrService,private router:Router,private domSanitizer:DomSanitizer,
  @Inject(DOCUMENT) private document: any) {
          this.myControlLoc = new FormControl() ;
     }

 infoDescription(){
 	alert(this.videoToUpdate.videoDescription.length)
 }

 infoTitle(){
 	alert(this.videoToUpdate.videoTitle.length+'||'+this.videoToUpdate.videoTitle)
 }

watchvideo(videoToUpdateId){
    var url = 'videos/'+videoToUpdateId;
    this.goTo(url);
}

selectedFile: File= null;
tmpThumbnail;

onFileInput(event){
  var file = event.dataTransfer ? event.dataTransfer.file[0] : <File>event.target.files[0];
  var pattern = /image-*/;

  var reader = new FileReader(); 
  if(!file.type.match(pattern)){
    alert('error')
    return;
  }

  reader.onload =  this._handleReaderLoaded.bind(this);
  reader.readAsDataURL(file);

}

 _handleReaderLoaded(e) {
    let reader = e.target;
    this.tmpThumbnail = reader.result;
    console.log(this.tmpThumbnail)
  }

valideUpdate(video){
    if(this.tmpThumbnail){
      video.videoPoster = this.tmpThumbnail;
    }

    this.videoService.editChannelVideosUserId(video).subscribe(result =>{
      this.updateTags();
      this.showSuccess();
    },err =>{
      this.showError();
    })
}

updateTags(){
  this.tags.map( function (tag) {
    // body...
    if(tag._id)
      tag._id = undefined;
  })
  this.videoService.updateVideoTags(this.tags)
  .subscribe( tags =>{

  },err => {
      alert("update tags err")
    }
  )
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
onDateChanges(){
   this.videoToUpdate.recordingDate = (this.recordingDate.value).toISOString() 
}

onLocationChanges(){
   this.videoToUpdate.videoLocation = (this.myControlLoc.value)  
}

uploadThumbnail(){
     alert("uploadThumbnail()") 
}

goTo(destination) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([destination]); 
     // this.getVideoFree(this.activatedRoute.snapshot.params.videoId?this.activatedRoute.snapshot.params.videoId:this.weekFreeVideos[0]._id);
}  

  ngOnInit() {
  	 this.logaPage();
  }

  logaPage(){



    var videoId = this.activatedRoute.snapshot.params.videoId;
    this.page.url = this.document.location.origin+'/videos/'+videoId;

    this.videoService.getVideoTags(videoId)
    .subscribe(tags =>{
      this.tags = tags;
    },error =>{
      alert('tags error')
    })

     this.videoService.getVideosToUpdateByUserId(videoId)
     .subscribe( video =>{ 
       this.videoToUpdate = video; 
       this.selected = video.public?'Public':'Subscribers';
       this.recordingDate = new FormControl(video.recordingDate) ;
       this.myControlLoc = new FormControl(video.videoLocation); 
     },error=>{
       alert("error")
     })
  }

}
