import { Inject,Injectable } from '@angular/core';  
import { NorrLabUser} from '../../interfaces/norrLabUser/norr-lab-user';
import { HttpClient,HttpParams } from '@angular/common/http';
import { NorrlabNavgationService } from '../../norrlab-navgation/norrlab-navgation.service';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { ToastrService } from 'ngx-toastr';
import {Router, ActivatedRoute, Params} from '@angular/router'; 
import { MessageService} from '../message-service/message.service';



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
  constructor(private messageService:MessageService,private httpClient:HttpClient, private norrlabNavgationService:NorrlabNavgationService,
  	@Inject(SESSION_STORAGE) private storage: StorageService,private toastr: ToastrService, private router:Router) { }

  userStatus(param) {
  	return false;
  }

  signOut(){
    //TODO post to save last onile date and duration
    var user = this.storage.get(STORAGE_USER_KEY);
    this.storage.set(STORAGE_USER_KEY,null);
  }


  reloadComponent() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        //this.router.navigate(['/user-trades/']);
         this.messageService.sendMessage('reload')
         window.history.back();
      } 

  userLogin(data,nextPage){
  	return this.httpClient.post(this.userLoginUrl,data).subscribe(user =>{ 
        this.storage.set(STORAGE_USER_KEY,  this.userMapperToClient(user));
        this.reloadComponent()

  	},err=>{
      this.toastr.error('provide good email and password') 
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

  getUserById(userId){
      const params = new HttpParams()
      .set('userId', userId);  
      return this.httpClient.get<NorrLabUser>(this.userIsLoggedInUrl,{params});
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
