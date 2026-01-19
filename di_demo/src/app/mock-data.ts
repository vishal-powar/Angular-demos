import { TaskItem } from './services/task-api.service';

export const mockTasks: TaskItem[] = [
  { id: 1, title: 'Draft onboarding email', owner: 'Asha', status: 'todo' },
  { id: 2, title: 'Review dependency graph', owner: 'Ravi', status: 'doing' },
  { id: 3, title: 'Publish DI guide', owner: 'Meera', status: 'done' }
];

export const mockProfile = {
  name: 'Vishal',
  role: 'Angular Engineer',
  team: 'Platform'
};
