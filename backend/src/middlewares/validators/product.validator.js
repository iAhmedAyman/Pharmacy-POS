import { z } from 'zod';

const productCreationSchema = z.object({
    // Validates it's a string containing digits, with up to 2 optional decimal places
    sellingPrice: z.coerce.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a valid price/decimal")
    .transform((val) => Number(val)), // Transform back into a number for prisma

    name: z.string().min(3, "Name must be at least 3 characters")
});

const productUpdateSchema = z.object({
    id: z.string().uuid("id needs to be a valid UUID string"),
    // Validates it's a string containing digits, with up to 2 optional decimal places
    sellingPrice: z.coerce.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a valid price/decimal")
    .transform((val) => Number(val)).optional(), // Transform back into a number for prisma
    name: z.string().min(3, "Name must be at least 3 characters").optional()
});

const productSearchSchema = z.object({
    id: z.string().uuid("id needs to be a valid UUID string").optional(),
    // Validates it's a string containing digits, with up to 2 optional decimal places
    sellingPrice: z.coerce.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a valid price/decimal")
    .transform((val) => Number(val)).optional(), // Transform back into a number for prisma
    
    name: z.string().min(3, "Name must be at least 3 characters").optional()
});

export {
    productCreationSchema,
    productUpdateSchema,
    productSearchSchema
}