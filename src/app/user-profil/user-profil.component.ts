import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { UserService} from '../services/user-service/user.service';
import { ToastrService } from 'ngx-toastr';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { DOCUMENT } from '@angular/platform-browser';
import { Inject,Injectable } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import {environment} from './../../environments/environment.prod';
//import { InfiniteScroll } from 'ngx-infinite-scroll';


@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
   _norrUser;
   __norrSubscribers ;
   picturUsereUrl;
   appActive = false;
   componentMap = new Map();
   alreadySubscribed;

   _profileTrades=true;
    _profileVideos=false;
    _profileAnalyses=false;
    _profileSubscribers=false;
    userScrolled:boolean = false;

  constructor(private userService:UserService,private toastrService:ToastrService,private activatedRoute: ActivatedRoute
    ,private elementRef : ElementRef) {

   }


   setMap(){
     this.componentMap.set("_profileTrades",this._profileTrades);
    this.componentMap.set("_profileVideos",this._profileVideos);
    this.componentMap.set("_profileAnalyses",this._profileAnalyses);
    this.componentMap.set("_profileSubscribers",this._profileSubscribers);
   }
   sameUser;
  getUserpicture(){
    if(this._norrUser){

    console.log(`${environment.apiUrl+this._norrUser.pictureUrl} `)
    return environment.apiUrl+this._norrUser.pictureUrl
    }
    return '';
  }

  goToSubscriberProfile(norrUserFollowing){

    console.log(norrUserFollowing)
    var url =
    window.location.href = `/user-profil/${norrUserFollowing._id._id}`;
  }

  getSubscriberPicture(subscriber){
    if(undefined == subscriber)
      return ;
    var url= (subscriber.norrUserFollowing.userPictureUrl.length > 1)? `${subscriber.norrUserFollowing.userPictureUrl}`: `${environment.apiUrl}/images/default_user.jpg`;
    return url
    //user.userPictureUrl?`${environment.apiUrl}/images${user.userPictureUrl}`:`${environment.apiUrl}/images/default_user.jpg`
  }

  subscribeToPublications(norrUserId){
    this.userService.createSubscribers(this.activatedRoute.snapshot.params.userId)
    .subscribe(subs =>{
      this.toastrService.success(`You will receive ${this._norrUser.lastName} notoficatons`)
      window.location.href = window.location.href
    }, err =>{
      this.toastrService.error(`Error trying to follow ${this._norrUser.lastName}`)
    })
  }

  unSubscribeToPublications(norrUserId){
       this.userService.unSubscribeToPublications(this.activatedRoute.snapshot.params.userId)
    .subscribe(subs =>{
      this.toastrService.success(`You Stop folloing ${this._norrUser.lastName} succesfully.`)
      window.location.href = window.location.href
    }, err =>{
      this.toastrService.error(`Error trying to unfollow ${this._norrUser.lastName}`)
    })
  }

  checkIfSubscribed(list): boolean{
    console.log(list);
    return list.forEach(item =>{
      if(item.norrUserFollowing._id._id == this.userService.getUser()._id)
            this.alreadySubscribed = true;
    })
  }

redirectToSendMessage(userId){
    this.userService.userIsLogged()
    .subscribe(user =>{
      window.location.href=`/messages/${userId}`
    })

}

  onScrollDown(){
    /*let tradePublication = document.querySelector(`#tradePublication`);

    let divMain = document.querySelector(`.container_video_edit.main`)
    console.log(`divMain.scrollHeight:${divMain.scrollHeight} window.pageYOffset: ${window.pageYOffset} `)
    console.log(`${document.documentElement.scrollTop}  `)
    console.log(document);
    this.userScrolled = true;*/
    //alert(`${tradePublication.scrollHeight}`);
  }
tmpThumbnail;
  ngOnInit() {
    window.addEventListener('scroll', this.onScrollDown, true);
// default-img.jpg
  this.setMap();
    this.userService.userIsLogged()
    .subscribe(userLogged =>{

        this.userService.getUserById(this.activatedRoute.snapshot.params.userId)
        .subscribe(user =>{
          this.appActive = true;
          this._norrUser = user;
          this.sameUser = (userLogged._id == this._norrUser._id)?true:false;
          this.picturUsereUrl = (user.userPictureUrl.trim().length>0?user.userPictureUrl :environment.apiUrl+'/images/default_user.jpg');
          this.tmpThumbnail = (user.userBackgroundUrl.trim().length>0?user.userBackgroundUrl :'');
          this.userService.getSubscribers(user._id)
          .subscribe(subscribers =>{
            this.__norrSubscribers = subscribers;
            this.checkIfSubscribed(this.__norrSubscribers);
          })

        },err =>{
          //TODO
        this.userService.toastError("You must be connected!")
        })
    }, err =>{
        this.userService.toastError("You must be connected!")
    })
  }


  hideAllOthers( param){
    this.componentMap.forEach( (value,key) =>{
      if( key!= param ){
        this.componentMap.set(key,false)
      }else{
        this.componentMap.set(param,true)
      }
      console.log(this.componentMap)
    })
  }

  displayTrades(param){
    this.hideAllOthers(param);
    this._profileTrades = true;
  }

  displayVideos(param){
    this.hideAllOthers(param);
    this._profileVideos = true;
  }

  displayAnalyses(param){
    this.hideAllOthers(param);
    this._profileAnalyses = true;
  }

  displaySubscribers(param){
    this.hideAllOthers(param);
    this._profileSubscribers = true;
  }

}


// http://localhost:369/{{images/community-user/ossene-profile.jpg}}
