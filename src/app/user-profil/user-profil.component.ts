import { Component, OnInit } from '@angular/core';
import { UserService} from '../services/user-service/user.service';  
import { ToastrService } from 'ngx-toastr';
import {Router, ActivatedRoute, Params} from '@angular/router'; 
import { DomSanitizer } from "@angular/platform-browser";
import { DOCUMENT } from '@angular/platform-browser';
import { Inject,Injectable } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes'; 
import {MatChipInputEvent} from '@angular/material';
import {environment} from './../../environments/environment.prod'; 


@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
   _norrUser;
   __norrSubscribers :[]=[] ;
   picturUsereUrl;
   appActive = false; 
   componentMap = new Map();

   _profileTrades=true;
    _profileVideos=false;
    _profileAnalyses=false;
    _profileSubscribers=false;

  constructor(private userService:UserService,private toastrService:ToastrService,private activatedRoute: ActivatedRoute) {

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
    var url= (subscriber.norrUserFollowed.userPictureUrl.length > 1)? `${environment.apiUrl }/images${subscriber.norrUserFollowed.userPictureUrl}`: `${environment.apiUrl}/images/default_user.jpg`;
    return url
    //user.userPictureUrl?`${environment.apiUrl}/images${user.userPictureUrl}`:`${environment.apiUrl}/images/default_user.jpg`
  }

  subscribeToPublications(_norrUserId:?){
    this.userService.createSubscribers(this.activatedRoute.snapshot.params.userId)
    .subscribe(subs =>{
      this.toastrService.success(`You will receive ${this._norrUser.lastName} notoficatons`)
    }, err =>{
      this.toastrService.error(`Error trying to follow ${this._norrUser.lastName}`)
    })
  }

  ngOnInit() {

// default-img.jpg
  this.setMap();
    this.userService.userIsLogged()
    .subscribe(user =>{

        this.userService.getUserById(this.activatedRoute.snapshot.params.userId)
        .subscribe(user =>{
          this.appActive = true;
          this._norrUser = user; 
          this.picturUsereUrl = environment.apiUrl+'/images'+(user.userPictureUrl.trim().length>0?user.userPictureUrl :'/default_user.jpg');
          this.userService.getSubscribers(user._id) 
          .subscribe(subscribers =>{
            this.__norrSubscribers = subscribers;
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