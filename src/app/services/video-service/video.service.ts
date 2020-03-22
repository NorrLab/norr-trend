import { Inject,Injectable } from '@angular/core';  
import { HttpClient,HttpParams } from '@angular/common/http';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { UserService} from '../user-service/user.service';
import { NorrLabVideo} from '../../interfaces/norrLabVideo/norr-lab-video';
import {merge, Observable, of as observableOf} from 'rxjs';
import {NorrLabView} from '../../interfaces/norrLabVideo/norr-lab-view';
import { FormBuilder, FormGroup } from '@angular/forms';
import {environment} from '../../../environments/environment.prod'; 

const VIDEO_URL=environment.apiUrl+"/norr-video";
const VIDEO_VIEWS_URL=environment.apiUrl+"/norr-video/video-views";
const VIDEO_COMMENT_URL=environment.apiUrl+"/norr-video/comments";
const VIDEO_TAGS_URL = VIDEO_URL+"/tags";
const VIDEO_URL_CREATE = VIDEO_URL+"/create-video/"
//

export interface Tag{
  name:string,
  _id:any,
  videoId:any
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
	
	norrlabVideo:any;
	norrlabVideos:any=[];
	comment:any;
  constructor(private httpClient:HttpClient,@Inject(SESSION_STORAGE) private storage: StorageService,
    private userService:UserService, private formBuilder :FormBuilder) { }

  shareOnSocialMedia(social){
    
  }
  
  createVideoTradeComment(videoComment){
  	return this.httpClient.post(VIDEO_URL,videoComment);
  }

  valideComment(cmt){
    cmt.videoCommentVideo= this.getVideo()._id;
    cmt.videoCommentUser = this.userService.getUser()._id
    return this.httpClient.post(VIDEO_COMMENT_URL,cmt);
  }

  getVideoFreeComments(videoReadayToplayId){

    const params = new HttpParams()
    .set('videoId', videoReadayToplayId);
      return this.httpClient.get(VIDEO_COMMENT_URL,{params});
  }

  upDateViews(videoReadayToplay){
    this.httpClient.put(VIDEO_VIEWS_URL,videoReadayToplay)
    .subscribe(rst =>{ 
      console.log("viewed")
    } ) ;
  }

   setVolumePosition(volumePosition){

    this.storage.set("VIDEO_VOLUME",volumePosition);
   }

   getVolumePosition(){

    return this.storage.get("VIDEO_VOLUME");
   }


  getVideoFree(videoId, limite){
  	const params = new HttpParams()
  	.set('videoId', (videoId?videoId:null))
	.set('limite', (limite?limite:null))
  	return this.httpClient.get(VIDEO_URL,{params});
  		
  }

  getVideoByUserProfile(userId,currentPage,chunk,criteria): Observable<NorrLabVideo>{
      const params = new HttpParams()
      .set('userId', userId)
      .set('currentPage',currentPage)
      .set('chunk',chunk)
      .set('criteria',criteria);
    return this.httpClient.get<NorrLabVideo>(`${VIDEO_URL}/${userId}`,{params}); 
  }

  deleteVideo(videoId){

    return this.httpClient.delete(VIDEO_URL+'/delete/'+videoId )
  }

  upDateNorrLabVideo(video){ 
  	return this.httpClient.put(VIDEO_URL,video);
  	
  }

  getVideo(){
  	return this.storage.get("VIDEO_KEY");
  }

  setVideo(video){
  	this.storage.set("VIDEO_KEY",video);
  }

  getVideosByUserId(): Observable<NorrLabVideo[]> {
      const url = `${VIDEO_URL}/${this.userService.getUser()._id}/videos`;
    return this.httpClient.get<NorrLabVideo[]>(url);
  }

  getVideosToUpdateByUserId(videoId): Observable<NorrLabVideo> {
      const url = VIDEO_URL+'/'+this.userService.getUser()._id+'/videos/'+videoId;
    return this.httpClient.get<NorrLabVideo>(url);
  }

  getVideoTags(videoId){
    const url = VIDEO_TAGS_URL+'/'+videoId;
    return this.httpClient.get<Tag[]>(url);
  } 

  updateVideoTags(tags){
    const url = VIDEO_TAGS_URL;
    return this.httpClient.post(url, tags);
  }

  getVideoAnalytics(videoId){
      var url = VIDEO_URL+'/analytics/'+videoId;
      return this.httpClient.get<NorrLabView[]>(url);
  }

  createVideoAnalytics(video){
      var url = VIDEO_URL+'/analytics';
      return this.httpClient.post(url,video);
  }

  createChannelVideosUserId(payLoad){

    var uploadForm = this.formBuilder.group({
      profile: ['']
    });


    uploadForm.get('profile').setValue(payLoad.fileInputVideo);
    const formData = new FormData();
    formData.append('fileInputVideo', uploadForm.get('profile').value);

      const url = VIDEO_URL_CREATE+this.userService.getUser()._id;
    return this.httpClient.post(url,formData,{
      reportProgress: true,
      observe: 'events'
    });
  }

  createVideoUserId(video): Observable<NorrLabVideo> {
     const url = VIDEO_URL+'/'+this.userService.getUser()._id;
    return this.httpClient.post<NorrLabVideo>(url,video, {
      reportProgress: true
    });
  }

  editChannelVideosUserId(video): Observable<NorrLabVideo> {
      const url = VIDEO_URL+'/'+this.userService.getUser()._id+'/videos/'+video._id;
    return this.httpClient.put<NorrLabVideo>(url,video);
  }  

}
