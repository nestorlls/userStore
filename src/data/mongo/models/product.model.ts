import { Schema, model } from 'mongoose';

/* prettier-ignore */
const productSchema = new Schema({
  name: { type: String, require: [true, 'Name is required'], unique: true },
  description: { type: String, require: [true, 'Description is required'] },
  available: { type: Boolean, default: false },
  price: { type: Number, require: [true, 'Price is required'] },
  category: { type: Schema.Types.ObjectId, ref: 'Category', require: [true, 'Category is required'] },
  user: { type: Schema.Types.ObjectId, ref: 'User', require: [true, 'User is required'] },
});

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
  },
});

export const Product = model('Product', productSchema);
