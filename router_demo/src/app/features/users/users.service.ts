import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

export interface User {
  id: number;
  name: string;
  role: string;
  bio: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly users: User[] = [
    { id: 1, name: 'Ava Patel', role: 'Designer', bio: 'Loves component APIs.' },
    { id: 2, name: 'Noah Diaz', role: 'Engineer', bio: 'Focuses on routes.' },
    { id: 3, name: 'Mia Chen', role: 'Manager', bio: 'Keeps teams aligned.' }
  ];

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: number) {
    const user = this.users.find((entry) => entry.id === id) ?? null;
    return of(user).pipe(delay(250));
  }

  updateUser(updated: User): void {
    const index = this.users.findIndex((entry) => entry.id === updated.id);
    if (index >= 0) {
      this.users[index] = { ...updated };
    }
  }
}
