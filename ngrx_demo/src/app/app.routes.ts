import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TasksPageComponent } from './tasks/tasks-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'tasks', component: TasksPageComponent, title: 'Tasks Store' },
  {
    path: 'books',
    title: 'Books Entity',
    loadChildren: () =>
      import('./books/books.routes').then((m) => m.BOOKS_ROUTES)
  },
  { path: '**', redirectTo: 'home' }
];
