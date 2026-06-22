import express from 'express';
import requiedRoles from '../middlewares/role.middleware.js'
import { Role } from '../utils/role.js';
import validator from '../middlewares/validator.middleware.js';
import { 
    saleCreationSchema,
    saleUpdateSchema,
    saleSearchSchema
 } from '../middlewares/validators/sale.validator.js'
import * as saleController from '../controllers/sale.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = express.Router();

// Sale creation
router.post("/api/sale/create", verifyToken, validator(saleCreationSchema), saleController.create);

// Sale update
router.patch("/api/sale/update", verifyToken, validator(saleUpdateSchema), saleController.update);

// Sale search
router.get("/api/sale/search", verifyToken, validator(saleSearchSchema, 'query'), saleController.search);

export default router;