// routes/adminOrderRoutes.js
import express from 'express';
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/adminOrderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly);

router.get('/all', getAllOrders);
router.put('/update/:id', updateOrderStatus);
router.delete('/delete/:id', deleteOrder);

export default router;
