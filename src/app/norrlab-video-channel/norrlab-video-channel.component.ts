import {  OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {NorrLabVideo} from '../interfaces/norrLabVideo/norr-lab-video';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { VideoService} from '../services/video-service/video.service';
import { UserService} from '../services/user-service/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; 


@Component({
  selector: 'app-norrlab-video-channel',
  templateUrl: './norrlab-video-channel.component.html',
  styleUrls: ['./norrlab-video-channel.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class NorrlabVideoChannelComponent  implements AfterViewInit {
  displayedColumns: string[] = ['Video', 'Visibility', 'Restriction', 'Created','Views','Comments','Likes (vs Dislike)'];
  exampleDatabase: ExampleHttpDatabase | null;
  data: GithubIssue[] = [];

  norrlabVideos: NorrLabVideo[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  ONLINE_USER : any;
  expandedElement:  null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpClient, private videoService:VideoService,private userService: UserService,
    private router:Router) {}
  
  goToSubscriberList(){

  }

  goToVideoEditPage(videoId){ 
    this.goTo('/videos-edition/'+videoId)
  }

  goToVideoChartPage(videoId){
    this.goTo('/video/'+videoId+'/analytics')
  }

  goToVideoCommentPage(videoId){
    this.goTo('/video/'+videoId+'/analytics')
  }



  goTo(destination) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([destination]);
  }   


  ngAfterViewInit() {

    this.videoService.getVideosByUserId().subscribe(videos =>{
      this.norrlabVideos = videos;
    })

    this.ONLINE_USER = this.userService.getUser(); 

    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        //this.data = data
      });
  }
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
        `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }
}
