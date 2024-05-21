import express from 'express';
import AdminAuthController from '../controllers/AdminAuthController';
import AdminAuthService from '../services/AdminAuthService';
const router = express.Router();
const adminAuthService = new AdminAuthService();
const adminAuthController = new AdminAuthController(adminAuthService);
router.get('/', (req, res) => {
    res.send('Hello World! HI');
});
router.post('/register', (req, res) => {
    adminAuthController.register(req, res);
});
router.post('/login', (req, res) => {
    adminAuthController.login(req, res);
});
export default router;
