const Order = require('../models/order');
const OrderItem = require('../models/orderItem');

const OrderController = {
    create: async (req, res) => {
        const { userId, totalPrice } = req.body;

        try {
            const orderId = await Order.create(userId, totalPrice);
            res.status(201).json({ message: 'Order created successfully.', orderId });
        } catch (error) {
            res.status(500).json({ message: 'Error creating order.', error: error.message });
        }
    },

    getById: async (req, res) => {
        const { id } = req.params;

        try {
            const order = await Order.findById(id);
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({ message: 'Order not found.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving order.', error: error.message });
        }
    },

    getByUserId: async (req, res) => {
        const userId = req.session.userId; // Assuming user ID is stored in the session

        try {
            const orders = await Order.findByUserId(userId);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving orders.', error: error.message });
        }
    },

    updateStatus: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
    
        try {
            console.log('Updating order status for order ID:', id, 'with status:', status);
            await Order.updateStatus(id, status);
            res.status(200).json({ success: true,  message: 'Order status updated successfully.' });
        } catch (error) {
            console.error('Error updating order status:', error);
            res.status(200).json({ success: false,  message: 'Error updating order status.', error: error.message });
        }
    },
    

    getAll: async (req, res) => {
        try {
            const orders = await Order.findAll();
            const ordersWithItems = await Promise.all(orders.map(async (order) => {
                const items = await OrderItem.findByOrderId(order.id);
                return { ...order, items }; // Include order items in each order object
            }));
            res.render('order_manager', { orders: ordersWithItems }); // Rendering EJS view with orders
        } catch (error) {
            console.error('Error displaying orders: ', error);
            res.status(500).json({ message: 'Error displaying orders.' });
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
    
        try {
            await Order.delete(id);
            res.status(200).json({ success: true, message: 'Order deleted successfully.' });
        } catch (error) {
            console.error('Error deleting order:', error);
            res.status(500).json({ success: false, message: 'Error deleting order.', error: error.message });
        }
    }
    
};

module.exports = OrderController;
