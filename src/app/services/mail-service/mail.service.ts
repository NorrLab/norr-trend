import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { UserService} from '../user-service/user.service';
import {environment} from './../../../environments/environment.prod';
import {NorrlabMail} from './../../interfaces/norrlabMail/norrlab-mail';
@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient:HttpClient,private userService: UserService) { }
   /******************************************************
    *              get all user messages
    *****************************************************/
   getUserChats(targetId){
  	var url = `${environment.apiUrl}${environment.mailService}${this.userService.getUser()._id}/${targetId}`;
  	return this.httpClient.get<NorrlabMail[]>(url);
    }

   /******************************************************
    *              create  user message
    *****************************************************/
    createMail(userMail){
      var url = `${environment.apiUrl}${environment.mailService}userMail.author._id`
      return this.httpClient.post(url, userMail)
    }

   /******************************************************
    *              delete  user messages
    *****************************************************/
    deleteMails(userId){
          return this.httpClient.delete(environment.mailService, userId)
    }

}
