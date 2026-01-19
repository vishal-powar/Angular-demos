import { Injectable, computed, signal } from '@angular/core';

export type UserRole = 'guest' | 'user' | 'admin';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly roleSignal = signal<UserRole>('guest');

  readonly role = computed(() => this.roleSignal());
  readonly isLoggedIn = computed(() => this.roleSignal() !== 'guest');

  loginAsUser(): void {
    this.roleSignal.set('user');
  }

  loginAsAdmin(): void {
    this.roleSignal.set('admin');
  }

  logout(): void {
    this.roleSignal.set('guest');
  }
}
