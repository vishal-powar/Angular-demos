import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { BooksApiService } from '../books-api.service';
import {
  addBook,
  addBookFailure,
  addBookSuccess,
  loadBooks,
  loadBooksFailure,
  loadBooksSuccess,
  toggleAvailability,
  toggleAvailabilityFailure,
  toggleAvailabilitySuccess
} from './books.actions';

@Injectable()
export class BooksEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(BooksApiService);

  readonly loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBooks),
      concatMap(() =>
        this.api.getBooks().pipe(
          map((books) => loadBooksSuccess({ books })),
          catchError((error) =>
            of(loadBooksFailure({ error: error.message ?? 'Load failed' }))
          )
        )
      )
    )
  );

  readonly addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBook),
      concatMap(({ title, author }) =>
        this.api.addBook(title, author).pipe(
          map((book) => addBookSuccess({ book })),
          catchError((error) =>
            of(addBookFailure({ error: error.message ?? 'Add failed' }))
          )
        )
      )
    )
  );

  readonly toggleAvailability$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleAvailability),
      concatMap(({ id }) =>
        this.api.toggleAvailability(id).pipe(
          map((book) => toggleAvailabilitySuccess({ book })),
          catchError((error) =>
            of(toggleAvailabilityFailure({ error: error.message ?? 'Toggle failed' }))
          )
        )
      )
    )
  );
}
