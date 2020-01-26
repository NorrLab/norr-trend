import { Component, OnInit } from '@angular/core';
import { UserService} from '../services/user-service/user.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NorrlabNavgationService } from '../norrlab-navgation/norrlab-navgation.service';

@Component({
  selector: 'app-norrlab.login',
  templateUrl: './norrlab.login.component.html',
  styleUrls: ['./norrlab.login.component.css']
})
export class NorrlabLoginComponent implements OnInit {
//norr-user
	
		data:any={
			"email":"some",
			"password":"123tx"
		}
  constructor(private userService:UserService, private location:Location, private norrlabNavgationService:NorrlabNavgationService) { }

  ngOnInit() {

  }

  userLogin(){ 
    console.log(this.location); 
  	this.userService.userLogin(this.data,'/user-trades');
  }

}
