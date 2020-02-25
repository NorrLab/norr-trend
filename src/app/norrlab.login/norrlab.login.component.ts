import { Component, OnInit } from '@angular/core';
import { UserService} from '../services/user-service/user.service';
import { Location } from '@angular/common'; 
import { NorrlabNavgationService } from '../norrlab-navgation/norrlab-navgation.service';
import { ToastrService } from 'ngx-toastr';
import {Router, ActivatedRoute, Params} from '@angular/router'; 

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
  constructor(private userService:UserService, private location:Location, private norrlabNavgationService:NorrlabNavgationService,
    private router:Router) { }

  ngOnInit() {

  }


  userLogin(){ 
    console.log(this.location); 
  	this.userService.userLogin(this.data,'/user-trades');
      
  }

}
