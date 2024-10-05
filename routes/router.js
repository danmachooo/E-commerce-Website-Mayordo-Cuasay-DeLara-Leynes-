const express = require('express');
const { register, login, logout, renderLogin, renderRegister, verifyEmail } = require('../controllers/authController');
const ProductController = require('../controllers/productController');
const OrderController = require('../controllers/orderController');
const OrderItemController = require('../controllers/orderItemController');
const CartController = require('../controllers/cartController');
const CheckoutController = require('../controllers/checkoutController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import the middleware
const router = express.Router();

router.post('/register-user', register);
router.post('/login-user', login);
router.get('/logout', logout); 

router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.get('/verify/:token', verifyEmail);

// Product routes
router.post('/products', ProductController.create);
// router.get('/products', authMiddleware, ProductController.getAll);
router.get('/product/:id', ProductController.getById);
router.put('/product/:id', ProductController.update);
router.delete('/product/:id', ProductController.delete);

// Order routes
router.post('/orders', OrderController.create);
router.get('/orders/:id', OrderController.getById);
router.get('/orders/user', OrderController.getByUserId);
router.put('/orders/:id/status', OrderController.updateStatus);

// Order Item routes
router.get('/order-items/:orderId', OrderItemController.getByOrderId);
router.delete('/order-items/:id', OrderItemController.delete);

// Cart routes
router.post('/cart/add', CartController.addItem);
router.get('/cart', CartController.viewCart);
router.put('/cart/update/:productId', CartController.updateItem);
router.delete('/cart/remove/:productId', CartController.removeItem);


router.delete('/cart/clear', CartController.clearCart);

// Checkout route
router.post('/checkout', CheckoutController.checkout);

// Protected shop route
router.get('/shop', authMiddleware, ProductController.getAll);

module.exports = router;
