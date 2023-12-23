import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, require: [true, 'Name is required'], unique: true },
  available: { type: Boolean, default: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: [true, 'User is required'],
  },
});

export const Category = model('Category', categorySchema);
