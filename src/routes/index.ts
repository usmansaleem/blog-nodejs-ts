import { Router } from "express";
import BlogRouter from "./Blog";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/blog", BlogRouter);

// Export the base-router
export default router;
