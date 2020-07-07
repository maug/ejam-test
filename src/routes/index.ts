import { Router } from 'express';
import UserRouter from './Users';
import TemplateRouter from './Templates';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/templates', TemplateRouter);

// Export the base-router
export default router;
