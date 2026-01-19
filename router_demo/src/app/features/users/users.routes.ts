import { Routes } from '@angular/router';
import { pendingChangesGuard } from '../../core/guards';
import { UserDetailComponent } from './user-detail.component';
import { UserEditComponent } from './user-edit.component';
import { UserListComponent } from './user-list.component';
import { UsersComponent } from './users.component';
import { userResolver } from './user.resolver';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: '', component: UserListComponent },
      {
        path: ':id/edit',
        component: UserEditComponent,
        resolve: { user: userResolver },
        canDeactivate: [pendingChangesGuard]
      },
      {
        path: ':id',
        component: UserDetailComponent,
        resolve: { user: userResolver }
      }
    ]
  }
];
