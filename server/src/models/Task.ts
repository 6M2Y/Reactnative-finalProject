import mongoose, { Schema, Types } from 'mongoose';
import {ITask} from '../types/tasktypes.js';
/* import commentSchema from './comment.js';
 */import { IComment } from '../types/commentTypes.js';


const commentSchema = new Schema<IComment>({
     authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
     authorName: String,
     authorRole: { type: String, enum: ['parent', 'child'] },
     message: String,
     createdAt:{type:Date,default:Date.now}
    
 },
 {_id:false}
);
 

const taskSChema:Schema = new Schema<ITask>({
    title: {type: String, required: true},
    description: String,
    assignedTo:{type:Types.ObjectId, ref: 'User', default:null } ,
    status: { type: String, enum: ['pending', 'taken', 'completed', 'verified', 'overdue'], default: 'pending' },
    points: {type: Number, default:0},
    completed: { type: Boolean, default: false },
    verified: { type: Boolean, default: false }, //parents confirm when the child is done with the chore
    comments:[commentSchema],
    familyCode:{type:String, required:true},
    dueDate: { type: Date, required: false },
    recurrence: { type: String, enum: ['none', 'daily', 'weekly', 'custom'] },
    recurrenceDays: { type: [String], default: [] },
    proofImg: {type:String, default:null}
    
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSChema);