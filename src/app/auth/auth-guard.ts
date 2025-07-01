import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  canActivate(_: ActivatedRouteSnapshot, __: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}