import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, require: [true, 'Name is required'] },
  email: { type: String, require: [true, 'Email is required'], unique: true },
  emailValidated: { type: Boolean, default: false },
  password: { type: String, require: [true, 'Password is required'] },
  avatar: { type: String },
  role: { type: [String], enum: ['user', 'admin'], default: ['user'] },
});

export const User = mongoose.model('User', userSchema);
