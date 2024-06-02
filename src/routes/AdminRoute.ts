import express from 'express';
import AdminAuthController from '../controllers/AdminAuthController';
import AdminAuthService from '../services/AdminAuthService';
import { VerifyAdmin } from '../middlewares/AdminAuthMiddleware';
import DashboardController from '../controllers/admin/DashboardController';

const router = express.Router();
const adminAuthService = new AdminAuthService();
const adminAuthController = new AdminAuthController(adminAuthService);
const dashboardController = new DashboardController();

router.post('/register', (req, res, next) => {
	adminAuthController.register(req, res, next);
});
router.post('/login', (req, res, next) => {
	adminAuthController.login(req, res, next);
});
router.post('/refresh', (req, res, next) => {
	adminAuthController.refresh(req, res, next);
});

//Auth Route from here
router.use(VerifyAdmin);

//Dashboard
router.get('/dashboard', (req, res, next) => {
	dashboardController.index(req, res, next);
});

export default router;
