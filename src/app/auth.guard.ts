import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { RouteData } from './route-data.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = (next.data as RouteData).role;
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && currentUser.role === expectedRole) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
