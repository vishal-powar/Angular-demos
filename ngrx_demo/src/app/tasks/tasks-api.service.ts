import { Injectable } from '@angular/core';
import { delay, of, throwError } from 'rxjs';
import { Task, TaskPriority } from './store/tasks.model';

@Injectable({ providedIn: 'root' })
export class TasksApiService {
  private nextId = 4;
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Prepare NgRx demo flow',
      priority: 'high',
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Add entity feature module',
      priority: 'medium',
      completed: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Review selectors and effects',
      priority: 'low',
      completed: false,
      createdAt: new Date().toISOString()
    }
  ];

  getTasks() {
    return of([...this.tasks]).pipe(delay(350));
  }

  addTask(title: string, priority: TaskPriority) {
    if (!title.trim()) {
      return throwError(() => new Error('Task title is required.'));
    }

    const task: Task = {
      id: this.nextId++,
      title,
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.tasks = [...this.tasks, task];
    return of(task).pipe(delay(250));
  }

  toggleTask(id: number) {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) {
      return throwError(() => new Error('Task not found.'));
    }

    const updated = { ...task, completed: !task.completed };
    this.tasks = this.tasks.map((item) => (item.id === id ? updated : item));
    return of(updated).pipe(delay(200));
  }
}
