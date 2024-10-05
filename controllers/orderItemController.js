const OrderItem = require('../models/orderItem');

const OrderItemController = {
    getByOrderId: async (req, res) => {
        const { orderId } = req.params;

        try {
            const orderItems = await OrderItem.findByOrderId(orderId);
            res.status(200).json(orderItems);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving order items.', error: error.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;

        try {
            await OrderItem.delete(id);
            res.status(200).json({ message: 'Order item deleted successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting order item.', error: error.message });
        }
    }
};

module.exports = OrderItemController;
