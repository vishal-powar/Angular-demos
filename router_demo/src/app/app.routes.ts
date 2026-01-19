import { Routes } from '@angular/router';
import { aboutResolver } from './core/about.resolver';
import { AuthGuard } from './core/auth.guard';
import { adminMatchGuard, authGuardFn } from './core/guards';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About',
    resolve: { info: aboutResolver }
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/users/users.routes').then((m) => m.USERS_ROUTES)
  },
  {
    path: 'admin',
    canMatch: [adminMatchGuard],
    canActivate: [authGuardFn],
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES)
  },
  {
    path: 'legacy',
    title: 'Legacy',
    loadComponent: () =>
      import('./pages/legacy/legacy.component').then((m) => m.LegacyComponent)
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: '**', component: NotFoundComponent, title: 'Not Found' }
];
