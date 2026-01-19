import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly redirectUrl = this.route.snapshot.queryParamMap.get('redirect') ?? '/';

  loginAsUser(): void {
    this.auth.loginAsUser();
    this.router.navigateByUrl(this.redirectUrl);
  }

  loginAsAdmin(): void {
    this.auth.loginAsAdmin();
    this.router.navigateByUrl(this.redirectUrl);
  }
}
