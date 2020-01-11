import { Component, OnInit } from '@angular/core';
import { UserService} from '../services/user-service/user.service';

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
  constructor(private userService:UserService) { }

  ngOnInit() {
  }

  userLogin(){
  	console.log(this.data);
  	this.userService.userLogin(this.data).subscribe(res =>{
  		console.log(res)
  	},err=>{
  		alert(err)
  	})
  }

}
