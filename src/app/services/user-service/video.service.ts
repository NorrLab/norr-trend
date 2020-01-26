import { Inject,Injectable } from '@angular/core';  
import { NorrLabUser} from '../../interfaces/norrLabUser/norr-lab-user';
import { HttpClient,HttpParams } from '@angular/common/http';

const VIDEO_URL = "localhost:369/user-video/comment"

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor() { }

  createVideoTradeComment(videoComment){ }

}
