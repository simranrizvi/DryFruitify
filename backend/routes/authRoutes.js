import express from 'express';
import { loginUser, logoutUser, registerUser, getMe, updateMe} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/me', protect, getMe); 
router.put("/me", protect, updateMe);  
export default router;
