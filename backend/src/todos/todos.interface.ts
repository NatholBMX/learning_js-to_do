export enum TaskPriority {
    High = 1,
    Medium = 2,
    Low = 3
  }
  
  export interface TodoElement {
    category: string;
    name: string;
    description: string;
    assignee: string;
    priority: TaskPriority;
    isFinished: boolean;
    id: number;
  }
  