import { createSelector } from '@ngrx/store';
import { tasksFeature } from './tasks.reducer';

export const selectTasks = tasksFeature.selectItems;
export const selectTasksLoading = tasksFeature.selectLoading;
export const selectTasksError = tasksFeature.selectError;

export const selectCompletedCount = createSelector(selectTasks, (tasks) =>
  tasks.filter((task) => task.completed).length
);

export const selectRemainingCount = createSelector(selectTasks, (tasks) =>
  tasks.filter((task) => !task.completed).length
);
