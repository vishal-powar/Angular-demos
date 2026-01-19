import { createFeature, createReducer, on } from '@ngrx/store';
import { Task } from './tasks.model';
import {
  addTaskFailure,
  addTaskSuccess,
  clearCompleted,
  loadTasks,
  loadTasksFailure,
  loadTasksSuccess,
  toggleTaskFailure,
  toggleTaskSuccess
} from './tasks.actions';

export interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null
};

const reducer = createReducer(
  initialState,
  on(loadTasks, (state) => ({ ...state, loading: true, error: null })),
  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    items: tasks,
    loading: false
  })),
  on(loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(addTaskSuccess, (state, { task }) => ({
    ...state,
    items: [...state.items, task]
  })),
  on(addTaskFailure, (state, { error }) => ({ ...state, error })),
  on(toggleTaskSuccess, (state, { task }) => ({
    ...state,
    items: state.items.map((item) => (item.id === task.id ? task : item))
  })),
  on(toggleTaskFailure, (state, { error }) => ({ ...state, error })),
  on(clearCompleted, (state) => ({
    ...state,
    items: state.items.filter((item) => !item.completed)
  }))
);

export const tasksFeature = createFeature({
  name: 'tasks',
  reducer
});

export const { name: tasksFeatureKey, reducer: tasksReducer } = tasksFeature;
