import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CanComponentDeactivate } from '../../core/guards';
import { User, UsersService } from './users.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent implements CanComponentDeactivate {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly users = inject(UsersService);

  user: User | null = this.route.snapshot.data['user'] ?? null;
  formModel = {
    name: this.user?.name ?? '',
    role: this.user?.role ?? '',
    bio: this.user?.bio ?? ''
  };
  private original = { ...this.formModel };

  hasUnsavedChanges(): boolean {
    return JSON.stringify(this.formModel) !== JSON.stringify(this.original);
  }

  save(): void {
    if (!this.user) {
      return;
    }

    const updated = { ...this.user, ...this.formModel };
    this.users.updateUser(updated);
    this.user = updated;
    this.original = { ...this.formModel };
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
