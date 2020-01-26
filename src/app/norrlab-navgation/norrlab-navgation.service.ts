import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NorrlabNavgationService {

	private previousUrl:any = undefined;
	private currentUrl:any = undefined;

  constructor(private router : Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  getPreviousUrl(){
  	return this.previousUrl;
  }
  goToNextUrl(nextPage){
  	console.log("previousUrl")
  	console.log(this.previousUrl)
  	this.router.navigate([nextPage]);
  }

}
