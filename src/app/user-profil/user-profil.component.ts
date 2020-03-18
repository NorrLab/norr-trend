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
   __norrSubscribers = [1,2,3,4,5,6,7,8];
   pictureUrl;
  constructor(private userService:UserService,private toastrService:ToastrService,private activatedRoute: ActivatedRoute) { }

  getUserpicture(){
    if(this._norrUser){

    console.log(`${environment.apiUrl+this._norrUser.pictureUrl} `)
    return environment.apiUrl+this._norrUser.pictureUrl
    }
    return '';
  }

  ngOnInit() {
  	this.userService.getUserById(this.activatedRoute.snapshot.params.userId)
  	.subscribe(user =>{
  		this._norrUser = user; 
      this.pictureUrl = environment.apiUrl+'/images'+user.userPictureUrl;
  	},err =>{
  		//TODO
  		window.history.back()
  	})
  }

}


// http://localhost:369/{{images/community-user/ossene-profile.jpg}}