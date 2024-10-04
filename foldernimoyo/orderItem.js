const { pool } = require('../config/db');

const OrderItem = {
    create: async (orderId, productId, quantity) => {
        await pool.query(
            'INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)', 
            [orderId, productId, quantity]
        );
    },

    findByOrderId: async (orderId) => {
        const [rows] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
        return rows; // Return all order items for the specified order
    },

    findById: async (orderItemId) => {
        const [rows] = await pool.query('SELECT * FROM order_items WHERE id = ?', [orderItemId]);
        return rows[0]; // Return the order item object if found
    },

    updateQuantity: async (orderItemId, quantity) => {
        await pool.query('UPDATE order_items SET quantity = ? WHERE id = ?', [quantity, orderItemId]);
    },

    delete: async (orderItemId) => {
        await pool.query('DELETE FROM order_items WHERE id = ?', [orderItemId]);
    }
};

module.exports = OrderItem;
