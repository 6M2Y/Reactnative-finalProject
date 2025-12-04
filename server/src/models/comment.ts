import mongoose, { Schema } from "mongoose";
import { IComment } from "../types/commentTypes";

const commentSchema = new Schema<IComment>({
 authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
     authorName: String,
     authorRole: { type: String, enum: ['parent', 'child'] },
     message: String,
     createdAt:{type:Date,default:Date.now}
    
 },
 {_id:false}
 );
 
export default commentSchema;
