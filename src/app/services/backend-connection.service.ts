import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendConnectionService {
  private apiUrl = 'http://localhost:5001/api'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  checkConnection(): Observable<any> {
    // You can replace this with any lightweight endpoint from your backend
    return this.http.get(`${this.apiUrl}/health-check`).pipe(
      tap(response => {
        console.log('Backend connection successful:', response);
      }),
      catchError(error => {
        console.error('Backend connection failed:', error);
        return of({ connected: false, error: error.message });
      })
    );
  }
}