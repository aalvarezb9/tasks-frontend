import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../../shared/services/auth-service';

export interface PaginatedTasks {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly apiUrl = `${environment.apiUrl}/tasks`;
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  constructor() { }
  
  list(page = 1, limit = 10): Observable<PaginatedTasks> {
    return this.http.get<PaginatedTasks>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  create(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}`, task);
  }

  update(id: string, changes: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, changes);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
