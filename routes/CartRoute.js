import express from 'express';
import { addToCartMiddleware } from '../middlewares/addToCartMiddleware.js';
import { addToCartController } from '../controllers/cartController.js';

const CarRoute = express.Router();

// Route to add an item to the cart
CarRoute.post('/cart/add', addToCartMiddleware, addToCartController);

export default CarRoute;
