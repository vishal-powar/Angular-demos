import { Injectable } from '@angular/core';
import { CanActivateChild, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminChildGuard implements CanActivateChild {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  canActivateChild(): boolean | UrlTree {
    return this.auth.role() === 'admin'
      ? true
      : this.router.createUrlTree(['/home']);
  }
}
