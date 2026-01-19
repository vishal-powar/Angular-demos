import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly auth = inject(AuthService);

  readonly isLoggedIn = this.auth.isLoggedIn;
  readonly role = this.auth.role;

  loginUser(): void {
    this.auth.loginAsUser();
  }

  loginAdmin(): void {
    this.auth.loginAsAdmin();
  }

  logout(): void {
    this.auth.logout();
  }
}
