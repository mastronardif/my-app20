import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
//import { LoadingService } from 'src/app/loading.service';
import { HttpClient } from '@angular/common/http';
// export const environment33 = {
//   appVersion: require('../../services/buildversion.json').version,
//   production: false
// };
// export const environment = {
//   version: require('../../package.json').version
// };

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false,
})

export class NavbarComponent implements OnInit, AfterViewInit{
  @Input() prevent: boolean | undefined;
  //prevent = true;
  //loading$: Observable<boolean> //this.loader.loading$;
  //
isHandset$: Observable<boolean>;

  currentApplicationVersion = "";//environment33.appVersion;
  //version = environment;
  // loading$ = this.loader.loading$;

  public now: number =  new Date().getTime();// = Date.now();



  constructor(
    private http: HttpClient,
    // public loader: LoadingService,
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {// initialize isHandset$ inside constructor or ngOnInit
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );

        // change isLoading status whenever notified
        //this.loading$ = this.loader.loading$;
        // loadingIndicatorService.onLoadingChanged.subscribe(
        //   (isLoading) => (this.loading = isLoading)
        // );

    //this.prevent = false;
    setInterval(() => {
      this.now = new Date().getTime();
      console.log(`Hello ${ this.now}`);
      //console.log(`VERSION: ${ this.version}`);
    }, 15000)

   //the this thing?? setInterval(this.myFunction, 2000)
  }
  ngOnInit(): void {
    console.log("NavbarComponent:ngOnInit ");
    //this.prevent = true;
    //throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    console.log("NavbarComponent:ngAfterViewInit ");
    //this.prevent = true;
    //throw new Error('Method not implemented.');
  }

 myFunction() {
    this.now = new Date().getTime();
    console.log(`Hello ${ this.now}`);
  }

  fetchUser() {
    this.http
      .get('https://api.github.com/users/mastronardif')
      .subscribe((res) => {
        console.log(res);
      });
 }
}
