import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

export interface PaginatedCategories {
  categories: Category[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiUrl = `${environment.apiUrl}/categories`;
  private readonly http = inject(HttpClient);
  constructor() { }

  list(page = 1, limit = 10): Observable<PaginatedCategories> {
    return this.http.get<PaginatedCategories>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  create(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}`, category);
  }
}
