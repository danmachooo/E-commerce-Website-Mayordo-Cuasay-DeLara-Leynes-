const express = require('express');
const { register, login, logout, renderLogin, renderRegister, verifyEmail } = require('../controllers/authController');
const ProductController = require('../controllers/productController');
const OrderController = require('../controllers/orderController');
const OrderItemController = require('../controllers/orderItemController');
const CartController = require('../controllers/cartController');
const CheckoutController = require('../controllers/checkoutController');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import the middleware
const upload = require('../middlewares/multerMiddleware');  // Import multer setup

const User = require('../models/user');
const router = express.Router();

router.post('/register-user', register);
router.post('/login-user', login);
router.get('/logout', logout); 

router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.get('/verify/:token', verifyEmail);

//admin routes
router.get('/admin', authMiddleware, (req, res) => {
    res.render('adminForm', {title: 'Admin home page'});
});
router.get('/admin/user-management', authMiddleware, UserController.displayAllUser);
router.post('/admin/user-management/update-user/:id', UserController.updateUser);


// Product routes
// Create a new product
router.get('/admin/product-management', ProductController.displayAllInAdmin)
router.get('/admin/product-management/add-form', ProductController.renderCreate)
router.post('/admin/product-management/add-form/add-product', upload.single('image'), ProductController.create);
// Add a category
// router.post('/admin/product-management/add-category', ProductController.addCategory);

// Get product by ID (for update form)
router.get('/admin/product-management/update-product/:id', ProductController.renderUpdate);

// Update an existing product
router.put('/admin/product-management/update-product/:id', upload.single('image'), ProductController.update);

// Delete a product (corrected route)
router.delete('/admin/product-management/delete-product/:id', ProductController.delete);



//end of admin routes
//Product routes
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
router.get('/checkout-page', CheckoutController.renderCheckout);

router.get('/thankyou', (req, res) => {
    res.render('thankyou', { title: 'Thank You' }); // Render your thank you EJS page
});

// Protected shop route
router.get('/shop', authMiddleware, ProductController.getAll);

module.exports = router;
