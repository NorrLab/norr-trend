import { Component, OnInit } from '@angular/core'; 
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NorrlabNavgationService } from '../norrlab-navgation/norrlab-navgation.service';
import { VideoService} from '../services/video-service/video.service';
import { CommentService} from '../services/comment-service/comment-service';
import { NorrLabVideo} from '../interfaces/norrLabVideo/norr-lab-video'; 
import { MatPaginatorIntl } from '@angular/material';




@Component({
  selector: 'app-norrlab-page'
})
export class NorrLabMatPaginatorIntl extends MatPaginatorIntl implements OnInit {
   itemsPerPageLabel = 'Comments per page';
   nextPageLabel     = 'Next comments';
   previousPageLabel = 'Previous comments';

   ngOnInit(){
     alert("ooo")
   }
}




@Component({
  selector: 'app-norrlab-video-comments-list',
  templateUrl: './norrlab-video-comments-list.component.html',
  styleUrls: ['./norrlab-video-comments-list.component.css']
})
export class NorrlabVideoCommentsListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
  private router: Router, private norrlabNavgationService:NorrlabNavgationService, private videoService:VideoService,
  private commentService:CommentService) {

  }

  public goToUserProfile(videoId){

    this.norrlabNavgationService.goTo('/user/'+videoId);
  }

  public video:NorrLabVideo;
   enableReply:boolean = false;
  public videoComments:any ;

  public replyComments;


  public getReplyComments(){
    this.commentService.getReplyComments()
    .subscribe(replies =>{
        this.replyComments = replies;
    },err =>{
      alert('error')
    })
  }


  public createReplyComment(){
//TODO create reply
    this.commentService.createReplyComment(null)
    .subscribe(replyComment =>{
      alert('ok')
    }, err =>{
      alert('not ok!!!..')
    })
  }

  public _enableReply(cmt){
    console.log(cmt);
    this.desableOther(this.videoComments,true,cmt); 
    cmt.display = !cmt.display;
  }

  public order: string = 'videoCommentDate';

  public __norrSort= false; 
  
  public __sortByEvent(event){
  }

  public _sortBy(){
      this.__norrSort = !this.__norrSort
  }

  private desableOther(videoComments,all,cmt) {
     videoComments.forEach(_cmt =>{
        if(!all){
            _cmt.display = false;
        } else if(_cmt._id!=cmt._id){
             _cmt.display = false;
        }
      });
   }

   public cancelReply(){ 
    this.desableOther(this.videoComments,false,undefined); 
   }

  public goToVideoPage(){
    this.norrlabNavgationService.goTo('/videos/'+this.route.snapshot.params.videoId);
  }

  ngOnInit() {
  	var videoId = this.route.snapshot.params.videoId;
  	//this.norrlabNavgationService.goTo();

  	this.videoService.getVideosToUpdateByUserId(videoId)
  	.subscribe( video =>{
  		this.video = video;
      //TODO get video comments, from video id.
      this.videoService.getVideoFreeComments(this.video._id).subscribe(comments =>{ 
          this.videoComments = comments;
          this.videoComments.forEach(cmt =>{
            cmt.display = false;
            this.getReplyComments();
          })
      });
  	})
  }

}
