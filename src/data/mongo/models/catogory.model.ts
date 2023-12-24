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

categorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const Category = model('Category', categorySchema);
