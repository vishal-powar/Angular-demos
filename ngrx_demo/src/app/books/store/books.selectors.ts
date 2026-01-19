import { createSelector } from '@ngrx/store';
import { booksAdapter, booksFeature } from './books.reducer';

const { selectAll, selectEntities, selectTotal } = booksAdapter.getSelectors(
  booksFeature.selectBooksState
);

export const selectBooks = selectAll;
export const selectBookEntities = selectEntities;
export const selectBooksTotal = selectTotal;
export const selectBooksLoading = booksFeature.selectLoading;
export const selectBooksError = booksFeature.selectError;

export const selectAvailableCount = createSelector(selectBooks, (books) =>
  books.filter((book) => book.available).length
);
