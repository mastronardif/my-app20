import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { normalizeToArray } from '../../../utils/api-utils';

@Component({
  selector: 'app-mytable',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule, // ✅ For [(ngModel)]
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, // ✅ For refresh button
    MatIconModule,
  ],
  templateUrl: './mytable.component.html',
  styleUrls: ['./mytable.component.css'],
})
export class MyTableComponent implements AfterViewInit {
  @Input() url: string = '';
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);
  statusMessage = 'Waiting for URL...';
  isError = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.url) {
      this.loadData();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData(): void {
    if (!this.url) return;

    this.statusMessage = '⏳ Loading...';
    this.isError = false;

    this.http.get<any>(this.url).subscribe({
      next: (data) => {
        const normalized = normalizeToArray(data);

        this.dataSource.data = normalized;

        if (normalized.length > 0) {
          this.displayedColumns = Object.keys(normalized[0]);
          this.statusMessage = `✅ Loaded ${normalized.length} rows`;
        } else {
          this.displayedColumns = [];
          this.statusMessage = '⚠️ No rows returned from URL';
        }

        // Ensure paginator & sort are attached after render
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

  /** ✅ Normalizes single object or array into array form */
  // private normalizeToArray(data: any): any[] {
  //   if (data == null) return [];
  //   if (Array.isArray(data)) return data;
  //   if (typeof data === 'object') return [data];
  //   return [];
  // }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
