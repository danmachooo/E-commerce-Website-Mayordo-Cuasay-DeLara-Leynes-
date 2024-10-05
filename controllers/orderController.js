const Order = require('../models/order');

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
            await Order.updateStatus(id, status);
            res.status(200).json({ message: 'Order status updated successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating order status.', error: error.message });
        }
    }
};

module.exports = OrderController;
