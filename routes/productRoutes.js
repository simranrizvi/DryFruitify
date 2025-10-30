import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  getCategories,
} from '../controllers/productController.js';
import upload from '../middleware/upload.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/top', getTopProducts);
router.get("/categories", getCategories);
router.get('/:id', getProductById);

  // Admin protected routes
  router.post('/', protect, adminOnly, upload.single('image'), createProduct);
  router.put('/:id', protect, adminOnly, updateProduct);
  router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;
