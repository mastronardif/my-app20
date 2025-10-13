import { Component, OnInit } from '@angular/core';
// import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MyTableComponent } from '../tables/mytable/mytable.component';

@Component({
  selector: 'app-mymat',
  templateUrl: './mymat.component.html',
  styleUrls: ['./mymat.component.css'],
  standalone: true,
  imports: [MatTableModule, MyTableComponent], // ✅ import Angular Material module here
})
export class MyMatComponent implements OnInit {
// apiUrl = 'https://jsonplaceholder.typicode.com/posts';
apiUrl = 'https://jsonplaceholder.typicode.com/users';

  displayedColumns: string[] = ['id', 'name', 'role'];
  dataSource = [
    { id: 1, name: 'Frank', role: 'Developer' },
    { id: 2, name: 'Maria', role: 'Manager' },
    { id: 3, name: 'John', role: 'Analyst' },
  ];

  constructor() {
    console.log(`My Matterial .component constructor()`);
  }

  ngOnInit(): void {
    console.log(`PageNotFound.component ngOnit()`);
  }

}
