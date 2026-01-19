export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  priority: TaskPriority;
  completed: boolean;
  createdAt: string;
}
