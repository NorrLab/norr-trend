import { Component, OnInit } from '@angular/core';
import { UserService} from '../services/user-service/user.service';  
import { ToastrService } from 'ngx-toastr';
import {Router, ActivatedRoute, Params} from '@angular/router'; 
import { DomSanitizer } from "@angular/platform-browser";
import { DOCUMENT } from '@angular/platform-browser';
import { Inject,Injectable } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes'; 
import {MatChipInputEvent} from '@angular/material';
import { TradesService} from '../services/trades-service/trades.service';
import {environment} from './../../environments/environment.prod'; 

@Component({
  selector: 'app-profile-trades',
  templateUrl: './profile-trades.component.html',
  styleUrls: ['./profile-trades.component.css']
})
export class ProfileTradesComponent implements OnInit {

  constructor(private userService:UserService,private toastrService:ToastrService,private activatedRoute: ActivatedRoute,
    private tradesService:TradesService) { }
  _norrUser;
  _userTrades ;
  picturUsereUrl;

  ngOnInit() { 
  	this.userService.getUserById(this.activatedRoute.snapshot.params.userId)
  	.subscribe(user =>{
  		this._norrUser = user; 
      this.picturUsereUrl = user.userPictureUrl?`${environment.apiUrl}/images${user.userPictureUrl}`:`${environment.apiUrl}/images/default_user.jpg`
      this.tradesService.getTradeByUserId(user._id)
      .subscribe( trades =>{
        this._userTrades = trades;
      }) 
  	},err =>{
  		//TODO
  		window.history.back()// https://material.angular.io/assets/img/examples/shiba2.jpg
  	})
  }

  getPicture(publication){
    var picutre = (publication.pictureUrl)?`${environment.apiUrl}${publication.pictureUrl}`:`${environment.apiUrl}/images/default-img.jpg`;
    return picutre;
    //+publication.pictureUrl
  }

}
