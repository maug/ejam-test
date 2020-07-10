import { Router } from 'express';
import TemplatesRouter from './templates';
import DeploymentsRouter from './deployments';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/templates', TemplatesRouter);
router.use('/deployments', DeploymentsRouter);

// Export the base-router
export default router;
