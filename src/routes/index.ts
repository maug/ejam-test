import { Router } from 'express';
import UserRouter from './Users';
import TemplatesRouter from './templates';
import DeploymentsRouter from './deployments';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/templates', TemplatesRouter);
router.use('/deployments', DeploymentsRouter);

// Export the base-router
export default router;
