import { Inject,Injectable } from '@angular/core';  
import { HttpClient,HttpParams } from '@angular/common/http';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { UserService} from '../user-service/user.service';
import { NorrLabVideo} from '../../interfaces/norrLabVideo/norr-lab-video';
import {merge, Observable, of as observableOf} from 'rxjs';
import {NorrLabView} from '../../interfaces/norrLabVideo/norr-lab-view';
import {environment} from '../../../environments/environment.prod'; 
 
//
 
const VIDEO_URL=environment.apiUrl+"/norr-video";
const VIDEO_VIEWS_URL=environment.apiUrl+"/norr-video/video-views";
const VIDEO_COMMENT_URL=environment.apiUrl+"/norr-video/comments";
const VIDEO_TAGS_URL = VIDEO_URL+"/tags";
const COMMENT_REPLY_URL = environment.apiUrl+'/comment/reply/';


export interface Tag{
  name:string,
  _id:any,
  videoId:any
}

export interface ReplyComment{
  _id:any,
  description:string,
  commentType:number,
  commentUser:any,
  commentComment:any
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
	
	norrlabVideo:any;
	norrlabVideos:any=[];
	comment:any;

  public replyComments: ReplyComment[];


  constructor(private httpClient:HttpClient,@Inject(SESSION_STORAGE) private storage: StorageService,
    private userService:UserService) { }
 
  valideComment(cmt){  
    cmt.videoCommentUser = this.userService.getUser()._id
    return this.httpClient.post(VIDEO_COMMENT_URL,cmt);
  }

  getCommentReplies(cmtId) {
    return this.httpClient.get<ReplyComment[]>(COMMENT_REPLY_URL+cmtId);
  }

  createCommentReplies(cmtId,reply) {
    this.httpClient.post(COMMENT_REPLY_URL+cmtId,reply)
    .subscribe(replies =>{
        return replies
    }, err =>{
      console.log(err)
    })
  }

  getVideoFreeComments(videoReadayToplayId){

    const params = new HttpParams()
    .set('videoId', videoReadayToplayId);
      return this.httpClient.get(VIDEO_COMMENT_URL,{params});
  } 

   setVolumePosition(volumePosition){ 
    this.storage.set("VIDEO_VOLUME",volumePosition);
   }

  public createReplyComment(replyComment){
    var url = COMMENT_REPLY_URL+this.userService.getUser()._id
    return this.httpClient.post(url,replyComment);
  }

  public getReplyComments(){
    var url = COMMENT_REPLY_URL+this.userService.getUser()._id
    return this.httpClient.get<ReplyComment[]>(url);
  }

   getVolumePosition(){

    return this.storage.get("VIDEO_VOLUME");
   }     

  getVideoTags(videoId){
    const url = VIDEO_TAGS_URL+'/'+videoId;
    return this.httpClient.get<Tag[]>(url);
  } 

  updateVideoTags(tags){
    const url = VIDEO_TAGS_URL;
    return this.httpClient.post(url, tags);
  }
  
}
