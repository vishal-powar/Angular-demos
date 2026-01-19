import { createAction, props } from '@ngrx/store';
import { Book } from './books.model';

export const loadBooks = createAction('[Books] Load');
export const loadBooksSuccess = createAction(
  '[Books] Load Success',
  props<{ books: Book[] }>()
);
export const loadBooksFailure = createAction(
  '[Books] Load Failure',
  props<{ error: string }>()
);

export const addBook = createAction(
  '[Books] Add',
  props<{ title: string; author: string }>()
);
export const addBookSuccess = createAction(
  '[Books] Add Success',
  props<{ book: Book }>()
);
export const addBookFailure = createAction(
  '[Books] Add Failure',
  props<{ error: string }>()
);

export const toggleAvailability = createAction(
  '[Books] Toggle Availability',
  props<{ id: string }>()
);
export const toggleAvailabilitySuccess = createAction(
  '[Books] Toggle Availability Success',
  props<{ book: Book }>()
);
export const toggleAvailabilityFailure = createAction(
  '[Books] Toggle Availability Failure',
  props<{ error: string }>()
);
