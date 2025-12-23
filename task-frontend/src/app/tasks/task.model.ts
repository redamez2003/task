export interface TaskI {
  id?: number;
  title: string;
  description?: string;
  dueDate?: string;
  completed?: boolean;
  projectId?: number;
}
