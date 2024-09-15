export interface Task {
  id: number;
  title: string;
  description: string;
  deadline?: string;
  priority?: 'High' | 'Medium' | 'Low';
  status: TaskStatus;
}

export enum TaskStatus {
  toDo = 'toDo',
  inProgress = 'inProgress',
  completed = 'completed'
}