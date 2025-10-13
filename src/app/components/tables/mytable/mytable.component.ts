import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-mytable',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './mytable.component.html',
  styleUrls: ['./mytable.component.css'],
})
export class MyTableComponent implements AfterViewInit, OnChanges {
  @Input() url = '';

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);
  statusMessage = 'Waiting for URL...';
  isError = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['url'] && this.url) {
      this.loadData();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData(): void {
    this.statusMessage = '⏳ Loading...';
    this.isError = false;

    this.http.get<any[]>(this.url).subscribe({
      next: (data) => {
        this.dataSource.data = data;

        if (data.length > 0) {
          this.displayedColumns = Object.keys(data[0]);
          this.statusMessage = `✅ Loaded ${data.length} rows`;
        } else {
          this.displayedColumns = [];
          this.statusMessage = '⚠️ No rows returned from URL';
        }

        // Ensure sorting works with dynamic headers
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
      },
      error: (err) => {
        this.isError = true;
        this.statusMessage = `❌ Error fetching data: ${err.status} ${err.statusText}`;
        this.dataSource.data = [];
        this.displayedColumns = [];
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
