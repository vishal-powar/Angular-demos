import { AsyncPipe, DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addTask, clearCompleted, loadTasks, toggleTask } from './store/tasks.actions';
import { TaskPriority } from './store/tasks.model';
import {
  selectCompletedCount,
  selectRemainingCount,
  selectTasks,
  selectTasksError,
  selectTasksLoading
} from './store/tasks.selectors';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [AsyncPipe, DatePipe, FormsModule, NgClass, TitleCasePipe],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.scss'
})
export class TasksPageComponent {
  private readonly store = inject(Store);

  readonly tasks$ = this.store.select(selectTasks);
  readonly loading$ = this.store.select(selectTasksLoading);
  readonly error$ = this.store.select(selectTasksError);
  readonly completedCount$ = this.store.select(selectCompletedCount);
  readonly remainingCount$ = this.store.select(selectRemainingCount);

  readonly priorities: TaskPriority[] = ['low', 'medium', 'high'];

  formModel = {
    title: '',
    priority: 'medium' as TaskPriority
  };

  constructor() {
    this.store.dispatch(loadTasks());
  }

  add(): void {
    this.store.dispatch(
      addTask({ title: this.formModel.title, priority: this.formModel.priority })
    );
    this.formModel.title = '';
  }

  toggle(id: number): void {
    this.store.dispatch(toggleTask({ id }));
  }

  clearCompleted(): void {
    this.store.dispatch(clearCompleted());
  }
}
