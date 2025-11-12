// form-loader.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FormLoaderService {
  constructor(private http: HttpClient) {}

  loadForm(formName: string): Observable<any> {
    return this.http.get(`/assets/forms/${formName}.json`);
  }
}
