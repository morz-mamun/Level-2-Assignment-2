import { model, Schema } from 'mongoose';
import { IProduct } from './product.interface';

// variants schema
const VariantsSchema = new Schema({
  type: { type: String, required: true }, // e.g., "size", "color"
  value: { type: String, required: true }, // e.g., "S", "Red"
});

// inventory schema
const InventorySchema = new Schema({
  quantity: { type: Number, required: true }, // total quantity available
  inStock: { type: Boolean, required: true }, // true if in stock, false otherwise
});

// create a product schema using mongoose
const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true }, // array of tags
  variants: { type: [VariantsSchema], required: true }, // array of variants
  inventory: { type: InventorySchema, required: true }, // inventory details
});

// create a product model

const ProductModel = model<IProduct>('Product', ProductSchema);

export default ProductModel;
// export const productSchemas = { VariantsSchema, InventorySchema, ProductSchema };
