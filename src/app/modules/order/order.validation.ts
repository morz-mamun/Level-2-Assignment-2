import { z } from "zod";

const OrderValidationSchema = z.object({
    email: z.string().email(),
    productId: z.string(),
    price: z.number().nonnegative("Price must be 0 or more"),
    quantity: z.number().nonnegative("Quantity must be 0 or more"),
})


export const validationSchemas = { OrderValidationSchema };