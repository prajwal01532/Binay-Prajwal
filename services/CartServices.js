import Cart from '../models/cartModel.js'; // Import Cart model using ES module syntax

// Find cart by user ID
export const findCartByUserId = async (userId) => {
  return await Cart.findOne({ userId });
};

// Add an item to the cart
export const addToCart = async (userId, { productId, quantity }) => {
  // Find the user's cart
  let cart = await findCartByUserId(userId);

  if (!cart) {
    // Create a new cart if none exists
    cart = new Cart({
      userId,
      items: [{ productId, quantity }],
    });
    return await cart.save();
  }

  // Check if the product already exists in the cart
  const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

  if (itemIndex > -1) {
    // Product exists, update the quantity
    cart.items[itemIndex].quantity += quantity;
  } else {
    // Add a new product to the cart
    cart.items.push({ productId, quantity });
  }

  // Save the updated cart
  return await cart.save();
};

// Remove an item from the cart
export const removeFromCart = async (userId, productId) => {
  const cart = await findCartByUserId(userId);
  if (!cart) {
    throw new Error('Cart not found');
  }

  // Filter out the product to remove
  cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

  // Save the updated cart
  return await cart.save();
};

// Clear the cart for a user
export const clearCart = async (userId) => {
  const cart = await findCartByUserId(userId);
  if (!cart) {
    throw new Error('Cart not found');
  }

  // Clear all items from the cart
  cart.items = [];
  return await cart.save();
};
