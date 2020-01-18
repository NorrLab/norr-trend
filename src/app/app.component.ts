import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Component, OnInit,ViewChild, ElementRef,AfterViewInit } from '@angular/core'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnDestroy, OnInit{

@ViewChild("__snav") __snav: ElementRef;
  mobileQuery: MediaQueryList;

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

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit():void{
      this.__snav.nativeElement.ontoggle(()=>{
          alert("heas")
        })
  }


  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
