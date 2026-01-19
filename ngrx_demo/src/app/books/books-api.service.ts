import { Injectable } from '@angular/core';
import { delay, of, throwError } from 'rxjs';
import { Book } from './store/books.model';

@Injectable({ providedIn: 'root' })
export class BooksApiService {
  private books: Book[] = [
    { id: 'b1', title: 'RxJS in Action', author: 'Paul Daniels', available: true },
    { id: 'b2', title: 'NgRx Quick Start', author: 'Sara Cole', available: false },
    { id: 'b3', title: 'State Management Patterns', author: 'Lee Tran', available: true }
  ];
  private nextId = 4;

  getBooks() {
    return of([...this.books]).pipe(delay(300));
  }

  addBook(title: string, author: string) {
    if (!title.trim() || !author.trim()) {
      return throwError(() => new Error('Title and author are required.'));
    }

    const book: Book = {
      id: `b${this.nextId++}`,
      title,
      author,
      available: true
    };
    this.books = [...this.books, book];
    return of(book).pipe(delay(250));
  }

  toggleAvailability(id: string) {
    const book = this.books.find((item) => item.id === id);
    if (!book) {
      return throwError(() => new Error('Book not found.'));
    }

    const updated = { ...book, available: !book.available };
    this.books = this.books.map((item) => (item.id === id ? updated : item));
    return of(updated).pipe(delay(200));
  }
}
