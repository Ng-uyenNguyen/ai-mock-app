import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Replace with your API URL

  isLoggedIn$ = new BehaviorSubject(false);

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
    localStorage.setItem('token', 'loggedIn');
    this.isLoggedIn$.next(true);
    return this.isLoggedIn$;
  }

  logout(): void {
    // Remove the token from local storage
    localStorage.removeItem('token');
    this.isLoggedIn$.next(false);
  }

  isAuthenticated() {
    // Check if the token exists in local storage
    return !!localStorage.getItem('token');
  }
}