import { Inject,Injectable } from '@angular/core';  
import { HttpClient,HttpParams } from '@angular/common/http';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { UserService} from '../user-service/user.service';
import { NorrLabVideo} from '../../interfaces/norrLabVideo/norr-lab-video';
import {merge, Observable, of as observableOf} from 'rxjs';

const VIDEO_URL="http://localhost:369/norr-video";
const VIDEO_VIEWS_URL="http://localhost:369/norr-video/video-views";
const VIDEO_COMMENT_URL="http://localhost:369/norr-video/comments";
//
@Injectable({
  providedIn: 'root'
})
export class VideoService {
	
	norrlabVideo:any;
	norrlabVideos:any=[];
	comment:any;
  constructor(private httpClient:HttpClient,@Inject(SESSION_STORAGE) private storage: StorageService,
    private userService:UserService) { }

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


  getVideoFree(videoId, limite): Observable<NorrLabVideo[]> {
  	const params = new HttpParams()
  	.set('videoId', (videoId?videoId:null))
	.set('limite', (limite?limite:null))
  	return this.httpClient.get<NorrLabVideo[]>(VIDEO_URL,{params});
  		
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
      const url = VIDEO_URL+'/'+this.userService.getUser()._id+'/videos';
    return this.httpClient.get<NorrLabVideo[]>(url);
  }

  getVideosToUpdateByUserId(videoId): Observable<NorrLabVideo> {
      const url = VIDEO_URL+'/'+this.userService.getUser()._id+'/videos/'+videoId;
    return this.httpClient.get<NorrLabVideo>(url);
  }

  editChannelVideosUserId(video): Observable<NorrLabVideo> {
      const url = VIDEO_URL+'/'+this.userService.getUser()._id+'/videos/'+video._id;
    return this.httpClient.patch<NorrLabVideo>(url,video);
  }

  getVideoSrc(param){
  	this.norrlabVideo={
	  "videoUrl":"",//BelattarQuenelleZemmour
	  "videoAuthor":0,
	  "videoTitle":"",
	  "videoDescription":"",
	  "videoLikes":{},
	  "videoPoster":"",
	  "videoDate":"",
	  "videoViews":0
	}
	  	if(param == 1){
	  		this.norrlabVideo.videoId=1; 
	  		this.norrlabVideo.videoUrl = "http://localhost:369/norrlab-users-video-2018/test.mp4";
	  		this.norrlabVideo.videoTitle = "Desire - The First Step toward Riches | Think and Grow Rich";
	  		this.norrlabVideo.videoPoster = "http://localhost:369/norrlab-users-video-2018/test.jpg"; 
	  		this.norrlabVideo.videoDate = "29 Dec 2019";
	  		this.norrlabVideo.videoDescription = " Dissid Retrouvez toutes les interventions  Dissid Retrouvez toutes les interventions";
	  		
	  		this.norrlabVideo.videoLikes = {"minus":65,"bonus":987,"userId":0}; 
	  		this.norrlabVideo.videoViews = "326.000"; 
	  	}else if(param == 2){
	  		this.norrlabVideo.videoId=2;
	  		this.norrlabVideo.videoUrl = "http://localhost:369/norrlab-users-video-2018/fondamentaux-du-trading-chapitre-1.mp4";
	  		this.norrlabVideo.videoTitle = "TKL";
	  		this.norrlabVideo.videoPoster = "http://localhost:369/norrlab-users-video-2018/fondamentaux-du-trading-chapitre-1.jpg";
	  		this.norrlabVideo.videoDate = "02 Jan 2019"; 
	  		this.norrlabVideo.videoDescription = " Dissid Retrouvez toutes les interventions Merci de vous abonner à la chaîne de secours Dissident Officiel 2";
	  		
	  		this.norrlabVideo.videoLikes = {"minus":5,"bonus":123,"userId":0}; 
	  		this.norrlabVideo.videoViews = "45.000"; 
	  	}else if(param == 3) {
	  		this.norrlabVideo.videoId=3;
	  		this.norrlabVideo.videoUrl = "http://localhost:369/norrlab-users-video-2018/BelattarQuenelleZemmour.mp4";
	  		this.norrlabVideo.videoTitle = "Une quenelle pour Zemmour";
	  		this.norrlabVideo.videoPoster = "http://localhost:369/norrlab-users-video-2018/BelattarQuenelleZemmour.jpg";
	  		this.norrlabVideo.videoDate = "11 Oct 2019"; 
	  		
	  		this.norrlabVideo.videoLikes = {"minus":789,"bonus":235,"userId":0}; 
	  		this.norrlabVideo.videoViews = "1.00"; 
	  		this.norrlabVideo.videoDescription = " Dissid Retrouvez toutes les ";
	  	}else if(param == 4){
	  		this.norrlabVideo.videoId=4;
	  		this.norrlabVideo.videoUrl = "http://localhost:369/norrlab-users-video-2018/NorrDom4.mp4";
	  		this.norrlabVideo.videoTitle = "Desire-The first step toward riches";
	  		this.norrlabVideo.videoPoster = "http://localhost:369/norrlab-users-video-2018/NorrDom4.jpg";
	  		this.norrlabVideo.videoDate = "11 Oct 2019"; 
	  		
	  		this.norrlabVideo.videoLikes = {"minus":789,"bonus":235,"userId":0}; 
	  		this.norrlabVideo.videoViews = "1.00"; 
	  		this.norrlabVideo.videoDescription = " Dissid Retrouvez toutes les interventions Merci de vous abonner à la chaîne de secours Dissident Officiel 2  Dissid Retrouvez toutes les interventions";
	  	}
	  	return this.norrlabVideo;
  }

  getWeekVideos(){
  	this.norrlabVideos = []  
  	for(var j=1;j<=4;j++){
  		this.norrlabVideos.push(this.getVideoSrc(j))
  	}
  	return this.norrlabVideos;
  }

  getAllVideoComments(videoId):any{
  	this.comment={
  		"userPictureUrl":"",
  		"userName":"",
  		"userComment":"",
  		"commentDate":""
  	};
  	//http request to get comments of this videoId
  	switch (videoId) {
  		case 1:
  			// code...
  			this.comment.userPictureUrl = "https://upload.wikimedia.org/wikipedia/commons/9/92/Charles_Henry_Dow.jpg"; 
  			this.comment.commentDate = "2 years ago";
  			this.comment.userName = "Charles D."; 
  			this.comment.userComment = "Dissident Officiel 3 days ago 2ème partie de l'émission  Face à l'info du 11 décembre 2019. Soutenez moi gratuitement en visionnant une publicité sur Utip : https://www.utip.io/dissidentofficiel Retrouvez toutes les interventions d''Eric Zemmour sur http://www.ericzemmour.org/ Merci de vous abonner à la chaîne de secours Dissident Officiel 2 : https://www.youtube.com/channel/UC-14rMLJVb4HKScomtWSGtw Pour tout commentaire ou question : dissidentofficiel@gmail.com (Le délai de réponse peut être long dépendant du volume des courriels)"; 
  			break;
  		case 2:
  			// code...
  			this.comment.userPictureUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdO_PqF3BgoPAXV5yVaNVO5Fr8XSnuq5BrgAaJjApRGTI3ScGQ&s"; 
  			this.comment.commentDate = "1 day ago";
  			this.comment.userName = "Aicha K."; 
  			this.comment.userComment = "tes les interventions d''Eric Zemmour sur http://www.ericzemmour.org/ Merci de vous abonner à la chaîne de secours Dissident Officiel 2 : https://www.youtube.com/channel/UC-14rMLJVb4HKScomtWSGtw Pour tout commentaire ou question : dissidentofficiel@gmail.com (Le délai de réponse peut être long dépendant du volume des courriels)"; 
  			break; 
  		case 3:
  			// code...
  			this.comment.userPictureUrl = "https://thoughtcatalog.files.wordpress.com/2018/04/fabio-jock-616488-unsplash.jpg?w=1140&h=1710"; 
  			this.comment.commentDate = "3 weeks ago";
  			this.comment.userName = "Mary E."; 
  			this.comment.userComment = "Dissident Officiel 3 days ago 2ème partie de l'émission  Face à l'info du 11 décembre 2019. Soutenez moi gratuitement en visionnant une publicité sur Utip : https://www.utip.io/dissidentofficiel Retrouvez toutes les interventions d''Eric Zemmour sur http://www.ericzemmour.org/ Merci de vous abonner à la chaîne de secours Dissident Officiel 2 : https://www.youtube.com/channel/UC-14rMLJVb4HKScomtWSGtw Pour tout commentaire ou question : dissidentofficiel@gmail.com (Le délai de réponse peut être long dépendant du volume des courriels)"; 
  			break;   
  		default:
  			// code...
  			break;
  	}
  	return this.comment;
  }

}
