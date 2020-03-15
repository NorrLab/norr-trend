import { Subscription } from 'rxjs';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Component, OnInit,ViewChild, ElementRef,AfterViewInit } from '@angular/core'; 
import { UserService} from './services/user-service/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; 
import { MessageService} from './services/message-service/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnDestroy, OnInit{

@ViewChild("__snav") __snav: ElementRef;
  mobileQuery: MediaQueryList;
  __isLogged;
  __userProfil;
  __showUserProfil = false;
  ONLINE_USER;
  fillerNav = [{"libelle":"Home","icon":"home","link":['/home']},{"libelle":"Users Trades","icon":"mode_comment","link":['/user-trades']},
  				{"libelle":"Videos","icon":"video_library","link":['/videos']},{"libelle":"Lessons","icon":"school","link":['/lessons']}];
  				//Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);  'Home','Users Trades','Videos','Lessons',

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;
  private subscription:Subscription;

  constructor(private messageService:MessageService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private userService:UserService, private router:Router,
    private activatedRoute: ActivatedRoute,) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
     this.subscription = this.messageService.getMessage()
     .subscribe(message =>{
       if(message){
           this.isLogged();
       }
     })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

  }

  goToUserChannel(){
      this.__showUserProfil =  !this.__showUserProfil; 
    this.goTo('videos-channel/'+this.userService.getUser()._id)
  }

  __signOut(){
    this.userService.signOut();

      this.__showUserProfil =  !this.__showUserProfil; 
    this.goTo('home')
  }

  goTo(destination) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([destination]);
  }   

  gorToMemberShips(){
      this.__showUserProfil =  !this.__showUserProfil; 
    this.goTo('memberships')
  }

  gorToAccountManager(){
      this.__showUserProfil =  !this.__showUserProfil; 
    this.goTo('account-manager/'+this.userService.getUser()._id+'')
  }

  goToUserProfil(){
    
  }

  goToVideoCreation(){
    this.userService.userIsLogged().subscribe(user =>{ 

      this.goTo('video-creation')  
      return true;
    }, err =>{
      this.__isLogged =  false; 
      this.goTo('/login');  
      return false;
    })   
  }

  gorToPositionPublication(){
      this.__showUserProfil =  !this.__showUserProfil; 
    this.goTo('position-bublication')
  }

  __goToProfil(){
    this.userService.userIsLogged().subscribe(user =>{
      this.__showUserProfil =  !this.__showUserProfil; 
      return true;
    }, err =>{
      this.__isLogged =  false; 
      this.goTo('/login');  
      return false;
    })
  }

  userIsLogged;
  __userIsLogged(){
    return this.userService.getUser()!= undefined;
  }

  isLogged(){
    this.userService.userIsLogged().subscribe(user =>{
      this.__isLogged =  true; 
      this.ONLINE_USER = user;
      this.__getUserPicture();
      return this.userIsLogged== true;
    }, err =>{
      this.__isLogged =  false; 
      return this.userIsLogged == false;
    })
  }

  goToProfilOrLog(){
    this.userService.userIsLogged().subscribe(user =>{
      
      this.__userProfil =  true;  
    }, err =>{
      this.__userProfil =  false;
    })
  }

  ngOnInit():void{ 
    this.isLogged();
  }


  __getUserPicture(): string{
    var picture = `http://localhost:369/images${this.ONLINE_USER && this.ONLINE_USER.userPictureUrl?this.ONLINE_USER.userPictureUrl: '/default_user.jpg'}`

      return picture;
    } 

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
