import express from 'express';
import requiedRoles from '../middlewares/role.middleware.js'
import verifyToken from '../middlewares/auth.middleware.js';
import { Role } from '../utils/role.js';
import validator from '../middlewares/validator.middleware.js';
import { 
    batchCreationSchema,
    batchUpdateSchema,
    batchSearchSchema
 } from '../middlewares/validators/batch.validator.js'
import * as batchController from '../controllers/batch.controller.js';

const router = express.Router();

// Batch creation
router.post("/api/batch/create", verifyToken, requiedRoles(Role.ADMIN), validator(batchCreationSchema), batchController.create);

// Batch update
router.patch("/api/batch/update", verifyToken, requiedRoles(Role.ADMIN), validator(batchUpdateSchema), batchController.update);

// Batch search
router.get("/api/batch/search", verifyToken, validator(batchSearchSchema, 'query'), batchController.search);

export default router;