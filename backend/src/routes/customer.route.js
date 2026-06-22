import express from 'express';
import validator from '../middlewares/validator.middleware.js';
import { 
    customerCreationSchema,
    customerUpdateSchema,
    customerSearchSchema
 } from '../middlewares/validators/customer.validator.js'
import * as customerController from '../controllers/customer.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = express.Router();

// Customer creation
router.post("/api/customer/create", verifyToken, validator(customerCreationSchema), customerController.create);

// Customer update
router.patch("/api/customer/update", verifyToken, validator(customerUpdateSchema), customerController.update);

// Customer search
router.get("/api/customer/search", verifyToken, validator(customerSearchSchema, 'query'), customerController.search);

export default router;