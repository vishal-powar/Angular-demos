import { Routes } from '@angular/router';
import { AdminChildGuard } from '../../core/admin-child.guard';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminSettingsComponent } from './admin-settings.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivateChild: [AdminChildGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'settings', component: AdminSettingsComponent }
    ]
  }
];
