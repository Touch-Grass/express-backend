import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

export interface IUser {
    username: string;
    password: string;
}
