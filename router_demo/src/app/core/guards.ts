import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export interface CanComponentDeactivate {
  hasUnsavedChanges: () => boolean;
}

export const authGuardFn: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login'], {
    queryParams: { redirect: state.url }
  });
};

export const adminMatchGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.role() === 'admin'
    ? true
    : router.createUrlTree(['/login'], { queryParams: { redirect: '/admin' } });
};

export const pendingChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component
) => {
  if (!component.hasUnsavedChanges()) {
    return true;
  }

  return confirm('You have unsaved changes. Leave this page?');
};
