import * as CartService from "../services/CartServices.js";

export const addToCartController = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user_id; // Retrieved from the `user` middleware

  try {
    // Call CartService to add the item to the cart
    const updatedCart = await CartService.addToCart(userId, { productId, quantity });

    res.status(200).json({
      message: "Item added to cart successfully",
      cart: updatedCart,
      success: true,
    });
  } catch (error) {
    console.error("Error in addToCartController:", error.message);
    res.status(500).json({
      message: "Server error while adding item to cart",
      success: false,
    });
  }
};
