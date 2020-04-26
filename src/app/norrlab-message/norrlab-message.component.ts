import { Component, OnInit,ViewChild, ElementRef,AfterViewInit } from '@angular/core';
import { MailService } from '../services/mail-service/mail.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService} from '../services/user-service/user.service';
import {NorrlabMail} from '../interfaces/norrlabMail/norrlab-mail';

export interface norrlabMail {
  _id:any,
	message:any,
	read:any,
	author:any,
	destination:any,
	date:any
}


@Component({
  selector: 'app-norrlab-message',
  templateUrl: './norrlab-message.component.html',
  styleUrls: ['./norrlab-message.component.css']
})
export class NorrlabMessageComponent implements OnInit, AfterViewInit {

  @ViewChild("msgInput") public msgInput: ElementRef;

  __userChats;
  __currentUserId;
  __targetUser;
  __mail: NorrlabMail;
  constructor(private mailService:MailService,private activatedRoute: ActivatedRoute,private userService: UserService) {}

   ngAfterViewInit(): void{
      this.msgInput.nativeElement.addEventListener('keyup', function(e) {
           alert(`${this.__mail.message}`)
      }, false);
   }

  ngOnInit() {;
    var targetId = this.activatedRoute.snapshot.params.targetId
    this.getUserById(targetId)
    this.getAllMessages(targetId);
  }

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
