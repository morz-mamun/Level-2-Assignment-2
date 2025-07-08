import { z } from "zod";

// Variants validation schema
const VariantValidationSchema = z.object({
  type: z.string().min(1, "Variant type is required"), // e.g., "size", "color"
  value: z.string().min(1, "Variant value is required"), // e.g., "S", "Red"
});

// Inventory validation schema
const InventoryValidationSchema = z.object({
  quantity: z.number().nonnegative("Quantity must be 0 or more"),
  inStock: z.boolean(),
});

// Product validation schema
const ProductValidationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().nonnegative("Price must be 0 or more"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string().min(1, "Tag must be a non-empty string")),
  variants: z.array(VariantValidationSchema).min(1, "At least one variant is required"),
  inventory: InventoryValidationSchema,
});

/**
 * ProductValidationSchema is a Zod schema for validating product data.
 * It ensures that the product has a name, description, price, category,
 * tags, variants, and inventory information with appropriate constraints.
 */


const UpdateProductValidationSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  variants: z.array(
    z.object({
      type: z.string(),
      value: z.string()
    })
  ).optional(),
  inventory: z.object({
    quantity: z.number().nonnegative(),
    inStock: z.boolean()
  }).optional()
})

// Validation schema for search query params
const productSearchQuerySchema = z.object({
  // string or undefined
  searchTerm: z.string().optional(),
});

// export default ProductValidationSchema;

export const validationSchemas = { ProductValidationSchema, UpdateProductValidationSchema, productSearchQuerySchema };