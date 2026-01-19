import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { User } from './users.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  private readonly route = inject(ActivatedRoute);

  readonly user$ = this.route.data.pipe(
    map((data) => data['user'] as User | null)
  );
}
