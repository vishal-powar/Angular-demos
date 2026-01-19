import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Book } from './books.model';
import {
  addBookFailure,
  addBookSuccess,
  loadBooks,
  loadBooksFailure,
  loadBooksSuccess,
  toggleAvailabilityFailure,
  toggleAvailabilitySuccess
} from './books.actions';

export interface BooksState extends EntityState<Book> {
  loading: boolean;
  error: string | null;
}

export const booksAdapter = createEntityAdapter<Book>();

const initialState: BooksState = booksAdapter.getInitialState({
  loading: false,
  error: null
});

const reducer = createReducer(
  initialState,
  on(loadBooks, (state) => ({ ...state, loading: true, error: null })),
  on(loadBooksSuccess, (state, { books }) =>
    booksAdapter.setAll(books, { ...state, loading: false })
  ),
  on(loadBooksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(addBookSuccess, (state, { book }) => booksAdapter.addOne(book, state)),
  on(addBookFailure, (state, { error }) => ({ ...state, error })),
  on(toggleAvailabilitySuccess, (state, { book }) =>
    booksAdapter.updateOne(
      { id: book.id, changes: { available: book.available } },
      state
    )
  ),
  on(toggleAvailabilityFailure, (state, { error }) => ({ ...state, error }))
);

export const booksFeature = createFeature({
  name: 'books',
  reducer
});

export const { name: booksFeatureKey, reducer: booksReducer } = booksFeature;
