import express from 'express';
import validator from '../middlewares/validator.middleware.js';
import { userUpdateSchema, userSearchSchema } from '../middlewares/validators/user.validator.js'
import * as userController from '../controllers/user.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = express.Router();

// User update
router.patch("/api/user/update", verifyToken, validator(userUpdateSchema), userController.update);

// User search
router.get("/api/user/search", verifyToken, validator(userSearchSchema, 'query'), userController.search);

export default router;