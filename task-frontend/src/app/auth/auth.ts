import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth {
  private apiUrl = 'http://localhost:8080/api/auth/login';
  private tokenReadySubject = new BehaviorSubject<boolean>(false);
  tokenReady$ = this.tokenReadySubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
        const token = localStorage.getItem('token');

    this.tokenReadySubject.next(!!token);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
     this.tokenReadySubject.next(true);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

