import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
		configUrl = "http://192.168.1.10:369/norr-user/login"; 
  constructor(private httpClient:HttpClient) { }

  userStatus(param) {
  	return false;
  }

  userLogin(data){
  	return this.httpClient.post(this.configUrl,data);
  }
}
