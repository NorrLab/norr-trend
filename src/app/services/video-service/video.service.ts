import { Inject,Injectable } from '@angular/core';  
import { HttpClient,HttpParams } from '@angular/common/http';
import { NorrLabVideo} from '../../interfaces/norrLabVideo/norr-lab-video';
//import { NorrLabVideoComment} from '../../interfaces/norrLabVideo/norr-lab-video';

const VIDEO_URL="http://localhost:369/norr-video";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
	
	norrlabVideo:any;
	norrlabVideos:any=[];
	comment:any;
  constructor(private httpClient:HttpClient) { }


  createVideoTradeComment(videoComment){
  	return this.httpClient.post(VIDEO_URL,videoComment);
  }

  getVideoFree(videoId, limite){
  	const params = new HttpParams()
  	.set('videoId', (videoId?videoId:null))
	.set('limite', (limite?limite:null))
  	return this.httpClient.get<NorrLabVideo>(VIDEO_URL,{params});
  		
  }

  upDateNorrLabVideo(video){ 
  	return this.httpClient.put(VIDEO_URL,video);
  	
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
