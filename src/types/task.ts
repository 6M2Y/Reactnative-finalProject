export interface IComment {
  authorId: string;
  authorName: string;
  authorRole: 'parent' | 'child';
  message: string;
  createdAt?: Date;
}

export interface ITask {
  _id: string;
  title: string;
  description?: string;
  assignedTo?: any|null;
  status: 'pending' | 'taken' | 'verified' | 'overdue' | 'completed'; 
  recurrence: 'none' | 'daily' | 'weekly' | 'custom';
  recurrenceDays: string[];
  
  points?: number;
  familyCode: string,
  completed: boolean;
  verified: boolean,
  proofImg:string,
  comments: IComment[]
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}