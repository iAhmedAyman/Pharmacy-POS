import { z } from 'zod';
import { Role } from '../../utils/role.js';

const userUpdateSchema = z.object({
    id: z.string(),

    email: z.string().email("Invalid email format"),

    username: z.string().min(6, "Username must be at least 6 characters").optional(),

    password: z
        .string()
        .min(8, "Password must at least be 8 characters long")
        .regex(/^(?=.*[A-Z])/, "Password must contain an uppercase letter")
        .regex(/^(?=.*[a-z])/, "Password must contain a lowercase letter")
        .regex(/^(?=.*[0-9])/, "Password must contain a number")
        .regex(/^(?=.*[@$!%*?&_])/, "Password must contain a special character").optional(),

    role: z.enum(Object.values(Role), {
        invalid_type_error: "Role must be either ADMIN or PHARMACIST"
    }).optional()
});

const userSearchSchema = z.object({
    id: z.string().uuid("id needs to be a valid UUID string").optional(),
    email: z.string().email("Invalid email format").optional(),
    username: z.string().min(4, "Username must be at least 4 characters").optional()
});

export {
    userUpdateSchema,
    userSearchSchema
}