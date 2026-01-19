import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addBook, loadBooks, toggleAvailability } from './store/books.actions';
import {
  selectAvailableCount,
  selectBooks,
  selectBooksError,
  selectBooksLoading,
  selectBooksTotal
} from './store/books.selectors';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss',
  imports: [AsyncPipe, CommonModule, FormsModule],
  standalone: true
})
export class BooksPageComponent {
  private readonly store = inject(Store);

  readonly books$ = this.store.select(selectBooks);
  readonly loading$ = this.store.select(selectBooksLoading);
  readonly error$ = this.store.select(selectBooksError);
  readonly total$ = this.store.select(selectBooksTotal);
  readonly available$ = this.store.select(selectAvailableCount);

  formModel = { title: '', author: '' };

  constructor() {
    this.store.dispatch(loadBooks());
  }

  add(): void {
    this.store.dispatch(
      addBook({ title: this.formModel.title, author: this.formModel.author })
    );
    this.formModel = { title: '', author: '' };
  }

  toggle(id: string): void {
    this.store.dispatch(toggleAvailability({ id }));
  }
}
