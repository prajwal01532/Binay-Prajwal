import { validationResult } from "express-validator";
import Product from "../models/Product";

export const addToCartMiddleware = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({
      message: "Product ID and quantity are required",
      success: false,
    });
  }

  if (quantity < 1) {
    return res.status(400).json({
      message: "Quantity must be at least 1",
      success: false,
    });
  }

  try {
    // Check if the product exists in the database
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    if (product.countInStock < quantity) {
      return res.status(400).json({
        message: `Only ${product.countInStock} units of this product are available`,
        success: false,
      });
    }

    // Add product details to request for the controller
    req.product = product;

    next();
  } catch (error) {
    console.error("Error in addToCartMiddleware:", error.message);
    res.status(500).json({
      message: "Server error while validating the product",
      success: false,
    });
  }
};
