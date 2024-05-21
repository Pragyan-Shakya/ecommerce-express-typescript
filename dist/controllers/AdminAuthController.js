export default class AuthController {
    adminAuthService;
    constructor(adminAuthService) {
        this.adminAuthService = adminAuthService;
    }
    async register(req, res) {
        try {
            const payload = req.body;
            const token = await this.adminAuthService.register(payload);
            return res.json({
                success: true,
                token: token,
            });
        }
        catch (error) {
            console.log('Error in register controller: ', error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await this.adminAuthService.login(email, password);
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password',
                });
            }
            return res.json({
                success: true,
                token: token,
            });
        }
        catch (error) {
            console.log('Error in login controller: ', error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    }
}
