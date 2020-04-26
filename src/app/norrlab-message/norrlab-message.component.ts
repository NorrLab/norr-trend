import { Component, OnInit } from '@angular/core';
import { MailService } from '../services/mail-service/mail.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService} from '../services/user-service/user.service';

@Component({
  selector: 'app-norrlab-message',
  templateUrl: './norrlab-message.component.html',
  styleUrls: ['./norrlab-message.component.css']
})
export class NorrlabMessageComponent implements OnInit {
//this.activatedRoute.snapshot.params.userId
  constructor(private mailService:MailService,private activatedRoute: ActivatedRoute,private userService: UserService) { }

  ngOnInit() {;
    var targetId = this.activatedRoute.snapshot.params.targetId
    this.getUserById(targetId)
    this.getAllMessages(targetId);
  }

  __userChats;
  __currentUserId;
  __targetUser;
  getUserById(targetId){
    this.userService.getUserById(targetId)
    .subscribe(tUser =>{
        this.__targetUser = tUser;
        console.log(this.__targetUser )
    },err=>{
      //TODO
    })
  }

  getAllMessages(targetId){
      this.__currentUserId = this.userService.getUser()._id;
      this.mailService.getUserChats(targetId)
      .subscribe(rslt =>{
        this.__userChats = rslt;
      }, err =>{
        //TODO pop error
      })
  }

  createMail(){
    this.mailService.createMail(this.__userChats)
    .subscribe(message =>{
      console.log(message)
    }, err=>{
      console.log(err)
    })
  }
}
