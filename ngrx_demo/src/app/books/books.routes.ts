import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { BooksPageComponent } from './books-page.component';
import { BooksEffects } from './store/books.effects';
import { booksFeatureKey, booksReducer } from './store/books.reducer';

export const BOOKS_ROUTES: Routes = [
  {
    path: '',
    component: BooksPageComponent,
    providers: [
      provideState(booksFeatureKey, booksReducer),
      provideEffects([BooksEffects])
    ]
  }
];
