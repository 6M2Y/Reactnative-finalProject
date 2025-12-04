import mongoose from "mongoose";
import { IUser } from "../types/userTypes.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// location sub-schema
const locationSchema = new mongoose.Schema({
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
    updatedAt: { type: Date, default: Date.now },
},
{ _id: false });

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["parent", "child"], default: "child" },
    familyCode: { type: String },
    points: { type: Number, default: 0 },
    //add location
    location: { type: locationSchema, default: () => ({}) },
    //avatar
    avatarUrl: {type:String, default:''},
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });


//hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // only hash if password is modified
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//update location updatedAt before saving
userSchema.pre("save", function (next) {
  if (this.isModified("location")) {
    this.location.updatedAt = new Date();
  }
  next();
});


//method to compare password
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this.password);
}
//method to generate auth token
userSchema.methods.generateAuthToken = function (): string {
    const token = jwt.sign({ _id: this._id, email:this.email }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '7d' }); // token valid for 7 days
    return token;
}

export const User = mongoose.model<IUser>('User', userSchema);


