import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Jwt } from '../../auth/models/jwt.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly http = inject(HttpClient);

  constructor() { }

  login(email: string, password: string): Observable<Jwt> {
    return this.http.post<Jwt>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((session: Jwt) => {
        this.saveToken(session.token);
      })
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }
}
