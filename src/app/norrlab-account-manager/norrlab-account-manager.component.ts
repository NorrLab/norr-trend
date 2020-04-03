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
  selector: 'app-norrlab-account-manager',
  templateUrl: './norrlab-account-manager.component.html',
  styleUrls: ['./norrlab-account-manager.component.css']
})
export class NorrlabAccountManagerComponent implements OnInit {
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

  getUserpicture(){
    if(this._norrUser){

    console.log(`${environment.apiUrl+this._norrUser.pictureUrl} `)
    return environment.apiUrl+this._norrUser.pictureUrl
    }
    return '';
  }

  getSubscriberPicture(subscriber){
    if(undefined == subscriber)
      return ;
    var url= (subscriber.norrUserFollowing.userPictureUrl.length > 1)? `${subscriber.norrUserFollowing.userPictureUrl}`: `${environment.apiUrl}/images/default_user.jpg`;
    return url
    //user.userPictureUrl?`${environment.apiUrl}/images${user.userPictureUrl}`:`${environment.apiUrl}/images/default_user.jpg`
  }

  updateProfile(norrUser){
    norrUser.userPictureUrl = this.picturUsereUrl ;
    norrUser.userBackgroundUrl = this.tmpThumbnail ;
    console.log(norrUser);
    this.userService.updateUserProfile(norrUser)
    .subscribe( user =>{
      console.log(user);
      window.location.href = window.location.href
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

  onFileInputProfile(event){
     var file = event.dataTransfer ? event.dataTransfer.file[0] : <File>event.target.files[0];
  	  var pattern = /image-*/;

  	  var reader = new FileReader();
  	  if(!file.type.match(pattern)){
  	    alert('error')
  	    return;
  	  }

  	  reader.onload =  this.profilePicHandleReaderLoaded.bind(this);
  	  reader.readAsDataURL(file);
  }

  onFileInputBackGround(event){
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
  tmpThumbnail;
  profilePicHandleReaderLoaded(e){
      let reader = e.target;
      this.picturUsereUrl = reader.result;
  }

  _handleReaderLoaded(e) {
      let reader = e.target;
      this.tmpThumbnail = reader.result;
      console.log(this.tmpThumbnail)
    }

  onScrollDown(){
  }

  ngOnInit() {
    window.addEventListener('scroll', this.onScrollDown, true);
// default-img.jpg
  this.setMap();
    this.userService.userIsLogged()
    .subscribe(user =>{

        this.userService.getUserById(this.activatedRoute.snapshot.params.userId)
        .subscribe(user =>{
          this.appActive = true;
          this._norrUser = user;
          this.picturUsereUrl = (user.userPictureUrl.trim().length>0?user.userPictureUrl :environment.apiUrl+'/images/default_user.jpg');
          this.tmpThumbnail = (user.userBackgroundUrl.trim().length>0?user.userBackgroundUrl :'');
          //environment.apiUrl+'/images'+
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

  goToSubscriberProfile(norrUserFollowing){

      console.log(norrUserFollowing)
      var url =
      window.location.href = `/user-profil/${norrUserFollowing._id._id}`;
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
