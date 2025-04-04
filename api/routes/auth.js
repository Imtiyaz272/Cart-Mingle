import express from 'express';
import { register, login, registerAdmin , sendEmail, resetPassword, checkUsername, getUsername} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);

router.post('/login',login);

router.post('/registerAdmin',registerAdmin)

router.post('/send-email', sendEmail);

router.post("/reset-password", resetPassword);

router.post("/check-username", checkUsername);
router.post("/getUsername", getUsername);
export default router;