const router = require('express').Router();
const AuthController = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/validation');

router.post('/register', validateRegistration, AuthController.register);
router.post('/login', validateLogin, AuthController.login);
router.post('/google', AuthController.googleLogin);
router.post("/send-otp", AuthController.sendOTP);
router.post('/reset-password', AuthController.resetPassword);

module.exports = router;
