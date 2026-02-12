import mongoose, { Schema, models } from 'mongoose';

const ProductSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  modelUrl: String,
  transparency: {
    tax: Number,
    shipping: Number,
    fee: Number
  }
});

export const Product = models.Product || mongoose.model('Product', ProductSchema);