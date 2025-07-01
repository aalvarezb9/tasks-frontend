import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../auth/models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}/users`;
  private readonly http = inject(HttpClient);

  constructor() { }

  register(email: string, name: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, { email, name, password });
  }
}
