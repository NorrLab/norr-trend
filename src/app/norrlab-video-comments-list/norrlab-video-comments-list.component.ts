import { Component, OnInit } from '@angular/core'; 
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NorrlabNavgationService } from '../norrlab-navgation/norrlab-navgation.service';
import { VideoService} from '../services/video-service/video.service';
import { NorrLabVideo} from '../interfaces/norrLabVideo/norr-lab-video';

@Component({
  selector: 'app-norrlab-video-comments-list',
  templateUrl: './norrlab-video-comments-list.component.html',
  styleUrls: ['./norrlab-video-comments-list.component.css']
})
export class NorrlabVideoCommentsListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
  private router: Router, private norrlabNavgationService:NorrlabNavgationService, private videoService:VideoService) { }
  public video:NorrLabVideo;
   enableReply:boolean = false;
  public videoComments:any ;

  public _enableReply(){
    this.enableReply = !this.enableReply;
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
      });
  	})
  }

}
