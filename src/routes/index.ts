import { Router } from 'express';
import UserRouter from './Users';
import BlogRouter from './Blog';
// Init router and path
const router = Router();

// Add sub-routes
router.use('/blog', BlogRouter);
router.use('/users', UserRouter); // TODO: Remove

// Export the base-router
export default router;
