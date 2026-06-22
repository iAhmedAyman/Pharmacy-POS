import express from 'express';
import requiedRoles from '../middlewares/role.middleware.js'
import { Role } from '../utils/role.js';
import validator from '../middlewares/validator.middleware.js';
import { 
    productCreationSchema,
    productUpdateSchema,
    productSearchSchema
 } from '../middlewares/validators/product.validator.js'
import * as productController from '../controllers/product.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = express.Router();

// Product creation
router.post("/api/product/create", verifyToken, requiedRoles(Role.ADMIN), validator(productCreationSchema), productController.create);

// Product update
router.patch("/api/product/update", verifyToken, requiedRoles(Role.ADMIN), validator(productUpdateSchema), productController.update);

// Product search
router.get("/api/product/search", verifyToken, validator(productSearchSchema, 'query'), productController.search);

export default router;