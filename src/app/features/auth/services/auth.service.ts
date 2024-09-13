import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://your-api-url.com/api'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    // return this.http.post(`${this.apiUrl}/register`, user);
    return of(true);
  }

  login(credentials: any): Observable<any> {
    // return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
    //   map((response: any) => {
    //     // Store the token in local storage
    //     localStorage.setItem('token', response.token);
    //     return response;
    //   })
    // );
    return of(true);
  }

  logout(): void {
    // Remove the token from local storage
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    // Check if the token exists in local storage
    return !!localStorage.getItem('token');
  }
}