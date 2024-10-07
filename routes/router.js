const express = require('express');
const { register, login, logout, renderLogin, renderRegister, verifyEmail } = require('../controllers/authController');
const ProductController = require('../controllers/productController');
const OrderController = require('../controllers/orderController');
const OrderItemController = require('../controllers/orderItemController');
const CartController = require('../controllers/cartController');
const CheckoutController = require('../controllers/checkoutController');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); // Authentication middleware
const upload = require('../middlewares/multerMiddleware'); // Multer middleware for file uploads

const router = express.Router();
const { pool } = require('../config/db');

// Auth routes
router.post('/register-user', register);
router.post('/login-user', login);
router.get('/logout', logout);
router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.get('/verify/:token', verifyEmail);

// Admin routes
// router.get('/admin', authMiddleware, (req, res) => {
//     res.render('adminForm', { title: 'Admin home page' });
// });
router.get('/admin', authMiddleware, async (req, res) => {
    try {
        const [users] = await pool.query('SELECT COUNT(*) AS total FROM users');
        const [products] = await pool.query('SELECT COUNT(*) AS total FROM products');
        const [orders] = await pool.query('SELECT COUNT(*) AS total FROM orders');
    
        // Fetch monthly sales data (adjust the query as needed)
        const [salesData] = await pool.query(`
          SELECT MONTH(created_at) AS month, SUM(total_price) AS total
          FROM orders
          WHERE YEAR(created_at) = YEAR(CURRENT_DATE())
          GROUP BY month
        `);
    
        // Prepare data for the chart
        const monthlySales = new Array(12).fill(0); // Assuming sales for each month
        salesData.forEach(sale => {
          monthlySales[sale.month - 1] = sale.total; // month - 1 because array is 0-indexed
        });
    
        res.render('adminForm', {
          totalUsers: users[0].total,
          totalProducts: products[0].total,
          totalOrders: orders[0].total,
          monthlySales: monthlySales // Pass monthly sales data to EJS
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
  });

router.get('/admin/user-management', authMiddleware, UserController.displayAllUser);
router.post('/admin/user-management/update-user/:id', UserController.updateUser);

// Product Management (Admin)
router.get('/admin/product-management', ProductController.displayAllInAdmin);
router.get('/admin/product-management/add-form', ProductController.renderCreate);
router.post('/admin/product-management/add-form/add-product', upload.single('image'), ProductController.create);
router.get('/admin/product-management/update-product/:id', ProductController.renderUpdate);
router.post('/admin/product-management/update-product/:id', upload.single('image'), ProductController.update);
router.delete('/admin/product-management/delete-product/:id', ProductController.delete);

// Order Management (Admin)
router.get('/admin/order-management', OrderController.getAll); // View all orders
router.post('/admin/order-management/update-status/:id', OrderController.updateStatus); // Update order status
router.delete('/admin/order-management/delete-order/:id', OrderController.delete); // Update order status
router.get('/admin/order-management/:id', OrderController.getById); // Get a specific order by ID

// User Routes
router.get('/order-history', OrderController.getByUserId); // Get orders for the logged-in user

// Public Product routes
router.get('/shop', authMiddleware, ProductController.getAll); // Shop route (Protected by authMiddleware)
router.get('/product/:id', ProductController.getById); // Get product by ID

// Order routes (General)
router.post('/orders', OrderController.create);
router.get('/orders/:id', OrderController.getById);
router.get('/orders/user', OrderController.getByUserId); 
router.post('/orders/:id/status', OrderController.updateStatus);

// Order Item routes
router.get('/order-items/:orderId', OrderItemController.getByOrderId);
router.delete('/order-items/:id', OrderItemController.delete);

// Cart routes
router.post('/cart/add', CartController.addItem);
router.get('/cart', CartController.viewCart);
router.put('/cart/update/:productId', CartController.updateItem);
router.delete('/cart/remove/:productId', CartController.removeItem);
router.delete('/cart/clear', CartController.clearCart);

// Checkout routes
router.post('/checkout', CheckoutController.checkout);
router.get('/checkout-page', CheckoutController.renderCheckout);

// Thank you page after successful checkout
router.get('/thankyou', (req, res) => {
    res.render('thankyou', { title: 'Thank You' });
});

//basic route
router.get('/about', (req, res) => {
  res.render('about', {title: 'About'} );
});
router.get('/contact', (req, res) => {
  res.render('contact', {title: 'contact'} );
});
module.exports = router;
