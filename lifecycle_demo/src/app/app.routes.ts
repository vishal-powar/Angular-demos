import { Routes } from '@angular/router';
import { LifecycleComponent } from './pages/lifecycle/lifecycle.component';
import { DocsComponent } from './pages/docs/docs.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'lifecycle' },
  { path: 'lifecycle', component: LifecycleComponent, title: 'Lifecycle' },
  { path: 'docs', component: DocsComponent, title: 'App Anatomy' },
  { path: '**', redirectTo: 'lifecycle' }
];
