const Product = require('../models/product');

const CartController = {
    // Helper function to calculate total price of the cart
    calculateTotal: (cart) => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    // Add item to cart or update quantity if it already exists
    addItem: (req, res) => {
        const { productId, name, price, quantity, image_path } = req.body; // Include image_path
        //const product = Product.findById(productId);
        console.log('Product file is', image_path)
        if (!req.session.cart) {
            req.session.cart = []; // Initialize cart if it doesn't exist
        }
    
        // Ensure quantity is a valid positive number
        if (quantity <= 0) {
            return res.status(400).json({ message: 'Invalid quantity.' });
        }
    
        // Check if the item is already in the cart
        const existingItem = req.session.cart.find(item => item.productId === productId);
        console.log('Test: ',image_path);
        if (existingItem) {
            existingItem.quantity += quantity; // Update quantity if item already exists
        } else {
            // Add new item to cart including the image_path
            req.session.cart.push({ productId, name, price, quantity, image_path });
        }
        console.log('From Cart Controller', req.session.cart);
        res.status(200).json({ message: 'Item added to cart successfully.' });
    },
    

    // View the cart and calculate total price
    viewCart: (req, res) => {
        const cart = req.session.cart || []; // Retrieve cart from session
        const total = CartController.calculateTotal(cart); // Calculate total price

        res.render('cart', { cart, total, title: 'Cart' });
    },

    updateItem: (req, res) => {
        const { productId } = req.params;  // productId from URL
        const { quantity } = req.body;     // quantity from the request body
    
        // Check if productId or quantity is missing
        if (!productId || !quantity) {
            return res.status(400).json({ message: 'Product ID and quantity are required.' });
        }
    
        // Ensure quantity is a valid positive number
        if (quantity <= 0) {
            return res.status(400).json({ message: 'Invalid quantity.' });
        }
    
        const item = req.session.cart.find(item => item.productId === productId);
        if (item) {
            item.quantity = quantity; // Update the quantity in the cart
            res.status(200).json({ message: 'Cart item updated successfully.' });
        } else {
            res.status(404).json({ message: 'Item not found in cart.' });
        }
    },
    
    
    

    // Remove an item from the cart
    removeItem: (req, res) => {
        const { productId } = req.params;

        const item = req.session.cart.find(item => item.productId === productId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart.' });
        }

        req.session.cart = req.session.cart.filter(item => item.productId !== productId); // Remove item from cart
        res.status(200).json({ message: 'Cart item removed successfully.' });
    },

    // Clear all items from the cart
    clearCart: (req, res) => {
        req.session.cart = []; // Clear the cart
        res.status(200).json({ message: 'Cart cleared successfully.' });
    }
};

module.exports = CartController;
