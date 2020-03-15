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



   setPreviousPage(previousPage){

   }

  getPreviousUrl(){
  	return this.previousUrl;
  }
  goToNextUrl(nextPage){
  	console.log("previousUrl")
  	console.log(this.previousUrl)
    window.history.back();
  }

  goTo(destination) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        //this.router.navigate([destination]);
        window.location.href=destination
  } 

}
