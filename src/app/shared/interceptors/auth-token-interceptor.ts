import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  private readonly authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (!token) return next.handle(req);

    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next.handle(cloned);
  }
}
