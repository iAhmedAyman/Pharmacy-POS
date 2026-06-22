import { z } from 'zod';

const saleItemSchema = z.object({
    productId: z.string().uuid("id needs to be a valid UUID string"),
    quantity: z.number({ invalid_type_error: 'Quantity must be a number' })
        .int("Quantity must be a whole number")
        .positive("Quantity must be 1 or more")
})

const rateSchema = z.coerce.string()
    .regex(/^\d+(\.\d{1,2})?$/, "Discount must be a valid decimal")
    // Ensure it doesn't go above 1.00
    .refine((val) => parseFloat(val) <= 1, "Discount multiplier cannot exceed 1.00")
    .optional();

const saleCreationSchema = z.object({
    discountRate: rateSchema,
    taxRate: rateSchema,
    customerId: z.string().uuid("id needs to be a valid UUID string").optional(),
    items: z.array(saleItemSchema).min(1, "A sale must contain at least one item")
});

const saleUpdateSchema = z.object({
    id: z.string().uuid("id needs to be a valid UUID string"),
    discountRate: rateSchema,
    taxRate: rateSchema,
    userId: z.string().uuid("id needs to be a valid UUID string").optional(),
    customerId: z.string().uuid("id needs to be a valid UUID string").optional(),
    items: z.array(saleItemSchema).min(1, "A sale must contain at least one item").optional()
});

const saleSearchSchema = z.object({
    id: z.string().uuid("id needs to be a valid UUID string").optional(),
    discountRate: rateSchema,
    taxRate: rateSchema,
    userId: z.string().uuid("id needs to be a valid UUID string").optional(),
    customerId: z.string().uuid("id needs to be a valid UUID string").optional(),
});

export {
    saleCreationSchema,
    saleUpdateSchema,
    saleSearchSchema
}