export interface IUser {
    _id: string;
  name: string;
    email: string;
    password: string;
    avatarUrl: string,
    role: "parent" | "child",
    points:Number,
    familyCode?: string,
    generateAuthToken: () => string; // Method to generate auth token
        comparePassword: (password: string) => Promise<boolean>; // Method to compare passwords

    createdAt: Date;
}