import { Types } from "mongoose";

// Define comment type
export interface IComment {
  authorId: Types.ObjectId;
  authorName: string;
  authorRole: 'parent' | 'child';
  message: string;
  createdAt?: Date;
}