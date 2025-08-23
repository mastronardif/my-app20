import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // imports: [NavbarComponent],
  standalone: false,
})
export class AppComponent {
  currentApplicationVersion = '1.0.0';

  constructor(private http: HttpClient) {}

  // triggerApiCall() {
  //   console.log('Simulate API call here...');
  // }
  triggerApiCall00 = () => {
    for (let j = 0, j_len = 10; j < j_len; j++) {
      for (let i = 1, i_len = 100; i < i_len; i++) {
        this.http
          .get(`https://jsonplaceholder.typicode.com/posts/${i}`)
          .subscribe((post) => console.log(post));
      }
    }
  };

  triggerApiCall = () => {
    // var loading = true;

    forkJoin([
      this.http.get('https://httpbin.org/delay/2'), // 2 sec delay
      this.http.get('https://httpbin.org/delay/4'), // 4 sec delay
      this.http.get('https://httpbin.org/delay/6'), // 6 sec delay

      // this.http.get('https://jsonplaceholder.typicode.com/posts/1'),
      // this.http.get('https://jsonplaceholder.typicode.com/posts/2'),
      // this.http.get('https://jsonplaceholder.typicode.com/posts/3'),
    ])
      .pipe(
        finalize(() => {
          // loading = false; // hide spinner no matter success/error
        })
      )
      .subscribe({
        next: (res) => {
          console.log('All done:', res);
          //this.results = res;
        },
        error: (err) => {
          console.error('One request failed:', err);
        },
        complete: () => {
          console.log('All requests completed');
        }
      });
  };
}
