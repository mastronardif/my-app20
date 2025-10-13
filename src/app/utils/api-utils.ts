import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

/**
 * Example utility function that fires multiple API calls
 */
export function triggerApiCall(http: HttpClient): Observable<any[]> {
  const requests: Observable<any>[] = [
    http.get('https://httpbin.org/delay/2'), // 2 sec delay
    http.get('https://httpbin.org/delay/4'), // 4 sec delay
    http.get('https://httpbin.org/delay/6'), // 6 sec delay
  ];

  // if (spinner) spinner.show();

  return forkJoin(requests).pipe(
    finalize(() => console.log('All requests completed')),
  );
}

/** ✅ Normalizes single object or array into array form */
export function  normalizeToArray(data: any): any[] {
  if (data == null) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === 'object') return [data];
  return [];
}
