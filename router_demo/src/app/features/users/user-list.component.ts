import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  private readonly usersService = inject(UsersService);
  readonly users = this.usersService.getUsers();
}
