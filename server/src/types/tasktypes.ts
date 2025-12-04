import { Document } from 'mongoose';
import { IComment } from './commentTypes';

export interface ITask extends Document {
  title: string;
  description?: string;
  assignedTo?: string|null;
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
