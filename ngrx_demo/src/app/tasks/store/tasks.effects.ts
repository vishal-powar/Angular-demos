import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { TasksApiService } from '../tasks-api.service';
import {
  addTask,
  addTaskFailure,
  addTaskSuccess,
  loadTasks,
  loadTasksFailure,
  loadTasksSuccess,
  toggleTask,
  toggleTaskFailure,
  toggleTaskSuccess
} from './tasks.actions';

@Injectable()
export class TasksEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(TasksApiService);

  readonly loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      concatMap(() =>
        this.api.getTasks().pipe(
          map((tasks) => loadTasksSuccess({ tasks })),
          catchError((error) =>
            of(loadTasksFailure({ error: error.message ?? 'Load failed' }))
          )
        )
      )
    )
  );

  readonly addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      concatMap(({ title, priority }) =>
        this.api.addTask(title, priority).pipe(
          map((task) => addTaskSuccess({ task })),
          catchError((error) =>
            of(addTaskFailure({ error: error.message ?? 'Add failed' }))
          )
        )
      )
    )
  );

  readonly toggleTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleTask),
      concatMap(({ id }) =>
        this.api.toggleTask(id).pipe(
          map((task) => toggleTaskSuccess({ task })),
          catchError((error) =>
            of(toggleTaskFailure({ error: error.message ?? 'Toggle failed' }))
          )
        )
      )
    )
  );
}
