import express from 'express';
import { ProductControllers } from './product.controller';
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  // searchProductByQuery,
} = ProductControllers;

// Routes for Product module
// router.get('/', searchProductByQuery); // Assuming you want to search products by query
router.get('/', getAllProducts);
router.post('/create-product', createProduct);
router.get('/:productId', getSingleProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

export const ProductRoutes = router;
