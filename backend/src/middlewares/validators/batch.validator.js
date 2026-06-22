import { z } from 'zod';

const batchCreationSchema = z.object({
    // Validates it's a string containing digits, with up to 2 optional decimal places
    purchasePrice: z.coerce.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a valid price/decimal")
    .transform((val) => Number(val)), // Transform price back to number for prisma

    productId: z.string("productId must be provided"),
    quantity: z.number({ invalid_type_error: 'Quantity must be a number' })
        .int("Quantity must be a whole number")
        .positive("Quantity must be 1 or more"),

    // Convert to Date, then dynamically check if it is greater than right now
    expireDate: z.coerce.date("expireDate must be a valid date").refine((val) => val > new Date(), {
        message: "Expiration date must be in the future!"
    })
});

const batchUpdateSchema = z.object({
    id: z.string().uuid("id needs to be a valid UUID string"),

    // Validates it's a string containing digits, with up to 2 optional decimal places
    purchasePrice: z.coerce.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a valid price/decimal")
    .transform((val) => Number(val)).optional(), // Transform price back to number for prisma

    quantity: z.number('Quantitiy myst be a number').int().positive("Quantity must be bigger than 1").optional(),
    productId: z.string("productId must be provided").optional(),

    // Convert to Date, then dynamically check if it is greater than right now
    expireDate: z.coerce.date().optional()
});

const batchSearchSchema = z.object({
    id: z.string().uuid("id needs to be a valid UUID string").optional(),

    // Validates it's a string containing digits, with up to 2 optional decimal places
    purchasePrice: z.coerce.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a valid price/decimal")
    .transform((val) => Number(val)).optional(), // Transform price back to number for prisma

    quantity: z.number('Quantitiy myst be a number').int().positive("Quantity must be bigger than 1").optional(),
    productId: z.string("productId must be provided").optional(),

    // Convert to Date, then dynamically check if it is greater than right now
    expireDate: z.coerce.date().optional()
});

export {
    batchCreationSchema,
    batchUpdateSchema,
    batchSearchSchema
}