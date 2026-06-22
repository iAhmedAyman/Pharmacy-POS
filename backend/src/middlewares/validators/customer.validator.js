import { z } from 'zod';

const customerCreationSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email format").optional(),
    phonenumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid Number!').optional()
});

const customerUpdateSchema = z.object({
    id: z.string().uuid("id needs to be a valid UUID string"),
    name: z.string().min(3, "Name must be at least 3 characters").optional(),
    email: z.string().email("Invalid email format").optional(),
    phonenumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid Number!').optional()
});

const customerSearchSchema = z.object({
    id: z.string().uuid("id needs to be a valid UUID string").optional(),
    name: z.string().min(3, "Name must be at least 3 characters").optional(),
    email: z.string().email("Invalid email format").optional(),
    phonenumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid Number!').optional()
});

export {
    customerCreationSchema,
    customerUpdateSchema,
    customerSearchSchema
}


/* 
Note to self: Consider doing it like this later
// 2. Update Schema (Makes all fields optional automatically!)
const customerUpdateSchema = customerCreationSchema.partial();

// 3. Search Schema (Takes the partial schema, and adds the ID field just for searching)
const customerSearchSchema = customerCreationSchema.partial().extend({
    id: z.string().uuid("id needs to be a valid UUID string").optional()
});
*/