import { createAction, props } from '@ngrx/store';
import { Task, TaskPriority } from './tasks.model';

export const loadTasks = createAction('[Tasks] Load');
export const loadTasksSuccess = createAction(
  '[Tasks] Load Success',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailure = createAction(
  '[Tasks] Load Failure',
  props<{ error: string }>()
);

export const addTask = createAction(
  '[Tasks] Add',
  props<{ title: string; priority: TaskPriority }>()
);
export const addTaskSuccess = createAction(
  '[Tasks] Add Success',
  props<{ task: Task }>()
);
export const addTaskFailure = createAction(
  '[Tasks] Add Failure',
  props<{ error: string }>()
);

export const toggleTask = createAction(
  '[Tasks] Toggle',
  props<{ id: number }>()
);
export const toggleTaskSuccess = createAction(
  '[Tasks] Toggle Success',
  props<{ task: Task }>()
);
export const toggleTaskFailure = createAction(
  '[Tasks] Toggle Failure',
  props<{ error: string }>()
);

export const clearCompleted = createAction('[Tasks] Clear Completed');
