import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OperatorsComponent } from './operators/operators.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'operators', component: OperatorsComponent, title: 'Operators' },
  { path: '**', redirectTo: 'home' }
];
