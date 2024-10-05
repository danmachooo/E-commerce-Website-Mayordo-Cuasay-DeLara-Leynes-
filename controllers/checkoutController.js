const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Product = require('../models/product'); // Import the Product model

const CheckoutController = {
    checkout: async (req, res) => {
        const userId = req.session.userId; // Assuming user ID is stored in the session
        const cart = req.session.cart || [];

        if (!cart.length) {
            return res.status(400).json({ message: 'Cart is empty.' });
        }

        // Calculate total price
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        // Create order
        const orderId = await Order.create(userId, totalPrice);

        // Create order items and update stock quantity
        for (const item of cart) {
            // Create order item
            await OrderItem.create(orderId, item.productId, item.quantity);

            // Update stock quantity
            const newStockQuantity = item.stock_quantity - item.quantity; // Calculate new stock quantity
            await Product.updateStock(item.productId, newStockQuantity); // Call the updateStock method to update the quantity
        }

        // Clear the cart after successful checkout
        req.session.cart = [];

        res.status(201).json({ message: 'Order created successfully.', orderId });
    }
};

module.exports = CheckoutController;
