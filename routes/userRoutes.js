import express from 'express';
import {
getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All routes below this will be protected
router.get("/profile", protect,getUserProfile);
router.put("/profile",protect,updateUserProfile);
router.get('/', adminOnly, getAllUsers);
router.get('/:id', adminOnly, getUserById);
router.delete('/:id', adminOnly, deleteUser);
router.put('/role/:id', adminOnly, updateUserRole);

export default router;
