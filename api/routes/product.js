import express from 'express';
import { addToCart, createCart, getCart, getProductDetails, getProducts, joinCart, removeItem, search } from '../controllers/product.controller.js';

const router = express.Router();

router.get("/", getProducts);
router.get('/getProductDetails/:productId', getProductDetails);
router.post('/addToCart', addToCart);
router.get('/getCart/:userId', getCart);
router.post('/createCart', createCart);
router.post('/joinCart', joinCart);
router.post('/removeItem', removeItem);
router.get('/search',search);
export default router;

