import { Document } from "mongoose";

export interface IUser extends Document {
    _id:string,
    name: string;
    email: string;
    password: string;
    avatarUrl: string,
    role: "parent" | "child",
    points: Number,
    location: {
        latitude: Number,
        longitude: Number,
        updatedAt: Date,
    },
    familyCode?: string,
    generateAuthToken: () => string; // Method to generate auth token
        comparePassword: (password: string) => Promise<boolean>; // Method to compare passwords

    createdAt: Date;
}

