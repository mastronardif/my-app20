// table-from-url.component.ts
import { Component, effect, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
//import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';

import { merge } from 'rxjs';
// import { LoadingService } from 'src/app/loading.service';
// import { HeroService } from 'src/app/services/hero.service';
import { HttpClient } from '@angular/common/http';
import { GlobalDataService } from '../../../services/global-data.service';

export interface User {
  name: string;
  email: string;
  phone: string;
  website: string;
  id: number;
  username: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Component({
  selector: 'app-table-from-url',
  templateUrl: 'table-from-url.component.html',
  styles: [
    `
      table {
        width: 100%;
      }

      mat-icon {
        cursor: pointer;
      }

      th.mat-sort-header-sorted {
        color: black;
      }
    `,
  ],
  standalone: false,
})
export class TableFromUrlComponent implements OnInit {
  displayedColumns: string[] = []; //['name', 'email', 'phone', 'website', 'action'];
  displayedColumnsExtra: string[] = ['edit', 'bobo'];
  //displayedColumnsAll: string[] = [];
  dataSource!: MatTableDataSource<any>;
  //user;
  gINFO = 'INFO';
  gUrl = '';
  users: any[] = []; //| undefined;
  //colNames:string[] = [];

  @ViewChild(MatSort)
  sort!: MatSort;

  //loading$ = this.loader.loading$;

  // constructor(private http: HttpClient, public dialog: MatDialog, private globalData: GlobalDataService) {
  //   // react whenever the signal changes
  //   effect(() => {
  //     const newValue = this.globalData.message();
  //     console.log("Global data changed:", newValue);

  //     // trigger your function
  //     if (newValue) {
  //       this.getUrlData(newValue);
  //       // this.editUser(this.gINFO, newValue);
  //     }
  //   });
  // }

  constructor(private http: HttpClient, public dialog: MatDialog, private globalData: GlobalDataService) {
  // let firstRun = true;
  effect(() => {
    const newValue = this.globalData.message();
    // if (firstRun) {
    //   firstRun = false;
    //   return; // skip initial run
    // }
    console.log("Global data changed:", newValue);
    if (newValue) {
      this.getUrlData(newValue);
    }
  });
}

  ngOnInit() {
    let uuu = 'https://jsonplaceholder.typicode.com/posts/1/comments?_delay=5000'; //'https://jsonplaceholder.typicode.com/users';
    console.log(`'- ------------- -------------  ngOnInit'`);
    this.globalData.updateMessage(uuu);
    //this.getUrlData(newValue);

      // this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts/1/comments?_delay=5000')
      // .subscribe({
      //   next: (v) => {
      //     console.log(v);
      //     this.users = v;
      //     this.displayedColumns = Object.keys(this.users[0]);
      //     this.dataSource = new MatTableDataSource(v);
      //     this.dataSource.sort = this.sort;
      //   },
      //   error: (e) => console.error(`\tERROR occured: ${JSON.stringify(e)}`),
      //   complete: () => console.info('complete'),
      //   //console.log(this.users);
      // });
  }

  editUser(action: string, user: any) {
    // switch on action
    console.log(JSON.stringify(action));
    switch (action) {
      case 'edit':
        console.log(JSON.stringify(user));
        alert(JSON.stringify(user));
        break;

      case this.gINFO:
        // console.log(JSON.stringify(user));
        // alert(JSON.stringify('url= '+ this.gUrl));
        let url = prompt("Please enter a url:", this.gUrl);
        if (url == null || url == "") {
          ;
        } else {
          this.globalData.updateMessage(url);
          // this.getUrlData(url);
          //this.getUrlData('https://jsonplaceholder.typicode.com/users');
        }
        break;

      default:
        console.log(`Sorry, we are out of ${action}.`);
        alert(`Sorry, we are out of ${action}.`);
    }
    //  console.log(JSON.stringify(user));
    //  alert(JSON.stringify(user));
    //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    //     width: '250px',
    //     data: user,
    //   });

    //   dialogRef.afterClosed().subscribe((result) => {
    //     this.user = user;
    //   });
  }

  getZZZ(fldIndex: number): string {
    if (this.users && this.users[0]) {
      //Object.keys(this.users[0])[0]
      return Object.keys(this.users[0])[0];
    }
    return '';
  }

  getUrlData(url: string) {
    // this.service
    //   //.getXYZ('https://jsonplaceholder.typicode.com/users')
    //   //.getXYZ('http://localhost:8080/api/data')
    //   // .getXYZ('http://127.0.0.1:8091/tutorial-server-0.0.1-SNAPSHOT/api/data')
    //   .getXYZ(url)
      this.http.get<any[]>(url)
      .subscribe({
        next: (v) => {
          console.log(v);
          this.users = v;
          this.displayedColumns = Object.keys(this.users[0]);
          //this.displayedColumnsExtra.push('action');
          //this.displayedColumnsAll = this.displayedColumns.concat(this.displayedColumnsExtra);
          this.dataSource = new MatTableDataSource(v);
          this.dataSource.sort = this.sort;
        },
        error: (e) => console.error(`\tERROR occured: ${JSON.stringify(e)}`),
        complete: () => console.info('complete'),
        //console.log(this.users);
      });
  }

}

// @Component({
//   // eslint-disable-next-line @angular-eslint/component-selector
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog.html',
//   standalone: false,
// })
// // eslint-disable-next-line @angular-eslint/component-class-suffix
// export class DialogOverviewExampleDialog {
//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: User
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
