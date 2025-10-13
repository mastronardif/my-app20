import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GlobalDataService } from '../../services/global-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false,
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @Input() prevent?: boolean;
  isHandset$: Observable<boolean>;
  now = Date.now();
  navLinks: { path: string; title: string }[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    public globalData: GlobalDataService
  ) {
    // ✅ Build nav links safely
    // this.navLinks = this.router.config
    //   .filter(r => !r.data?.['hideFromNav'] && !!r.data?.['title'] && r.path)
    //   .map(r => ({
    //     path: '/' + r.path,
    //     title: r.data?.['title'] ?? '',
    //   }));

       this.navLinks =    this.router.config
      .filter(r => !r.data?.['hideFromNav'])
      .map(r => ({
        path: '/' + r.path,
        title: r.data?.['title'] ?? '',
      }));


    // ✅ Track handset layout
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches),
      shareReplay()
    );

    // ✅ Update clock every 15 seconds
    setInterval(() => {
      this.now = Date.now();
      console.log(`Hello ${this.now}`);
    }, 15000);

    console.log('Router config:', this.router.config);
console.log('NavLinks:', this.navLinks);


  }

  ngOnInit(): void {
    console.log('NavbarComponent initialized');
  }

  ngAfterViewInit(): void {
    console.log('NavbarComponent view initialized');
  }

  myFunction(): void {
    this.now = Date.now();
    console.log(`Hello ${this.now}`);
  }

  fetchUser(): void {
    this.http.get('https://api.github.com/users/mastronardif').subscribe((res) => {
      console.log(res);
    });
  }

  onCustomClick(): void {
    console.log('Custom button clicked!');
    const input = window.prompt('Enter your message:');
    if (input) {
      console.log('User entered:', input);
      this.globalData.updateMessage(input);
      this.fetchUser();
    }
  }
}
