import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor() { }

  shareOnTwitter(text):string{
    return `https://twitter.com/intent/tweet?text=${text}`;
  }

  shareOnFacebook():string{
    return ``;
  }

  shareOnLinkedin():string{
    return ``;
  }

  shareOnInstagram():string{
    return ``;
  }

}
