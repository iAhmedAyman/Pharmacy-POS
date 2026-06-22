import { z } from 'zod';
import { Role } from '../../utils/role.js';

const signupSchema = z.object({
    email: z.string().email("Invalid email format"),

    username: z.string().min(6, "Username must be at least 6 characters"),

    password: z
        .string()
        .min(8, "Password must at least be 8 characters long")
        .regex(/^(?=.*[A-Z])/, "Password must contain an uppercase letter")
        .regex(/^(?=.*[a-z])/, "Password must contain a lowercase letter")
        .regex(/^(?=.*[0-9])/, "Password must contain a number")
        .regex(/^(?=.*[@$!%*?&_])/, "Password must contain a special character"),

    role: z.enum(Object.values(Role), {
        invalid_type_error: "Role must be either ADMIN or PHARMACIST"
    })
});

const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required") // Only check if password was provided
});

export {
    loginSchema,
    signupSchema
}