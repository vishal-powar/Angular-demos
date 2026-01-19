import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { User, UsersService } from './users.service';

export const userResolver: ResolveFn<User | null> = (route) => {
  const users = inject(UsersService);
  const router = inject(Router);
  const id = Number(route.paramMap.get('id'));

  return users.getUser(id).pipe(
    map((user) => {
      if (!user) {
        router.navigate(['/users']);
      }
      return user;
    })
  );
};
