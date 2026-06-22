import express from 'express';
import validator from '../middlewares/validator.middleware.js';
import { signupSchema, loginSchema } from '../middlewares/validators/auth.validator.js'
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

// Sign up
router.post("/api/user/signup", validator(signupSchema), authController.signUp);

// Login
router.post("/api/user/login", validator(loginSchema), authController.login);

export default router;