import { Inject,Injectable } from '@angular/core';  
import { NorrLabUser} from '../../interfaces/norrLabUser/norr-lab-user';
import { HttpClient,HttpParams } from '@angular/common/http';
import { NorrlabNavgationService } from '../../norrlab-navgation/norrlab-navgation.service';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';



const STORAGE_USER_KEY = 'NORR_USER_KEY';		

const USER = {
	firstName:"",
	lastName:"",
	_id:"",
	userPictureUrl:"",
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userLoginUrl = "http://localhost:369/norr-user/login"; 
  userIsLoggedInUrl = "http://localhost:369/norr-user/"; 
  constructor(private httpClient:HttpClient, private norrlabNavgationService:NorrlabNavgationService,
  	@Inject(SESSION_STORAGE) private storage: StorageService) { }

  userStatus(param) {
  	return false;
  }

  signOut(){
    //TODO post to save last onile date and duration
    var user = this.storage.get(STORAGE_USER_KEY);
    this.storage.set(STORAGE_USER_KEY,null);
  }

  userLogin(data,nextPage){
  	return this.httpClient.post(this.userLoginUrl,data).subscribe(user =>{
  		console.log(user);
      console.log("this.norrlabNavgationService.goToNextUrl()");
        //this.norrlabNavgationService.goToNextUrl(nextPage);
        this.storage.set(STORAGE_USER_KEY,  this.userMapperToClient(user));
  	},err=>{
  		alert(err);
  	});
  }

  userIsLogged(){
  	const params = new HttpParams()
	.set('userId', this.storage.get(STORAGE_USER_KEY)?this.storage.get(STORAGE_USER_KEY)._id:'');
  	return this.httpClient.get<NorrLabUser>(this.userIsLoggedInUrl,{params});
  } 

  getUser(){
  	return this.storage.get(STORAGE_USER_KEY);
  }
	userMapperToClient(data){
		 	USER.firstName = data.user.firstName
			USER.firstName = data.user.firstName;
			USER.lastName = data.user.lastName;
			USER._id = data.user._id;
			USER.userPictureUrl = data.user.userPictureUrl;
			return USER;
	}

}
