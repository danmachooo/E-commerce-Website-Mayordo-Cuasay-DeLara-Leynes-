const { pool } = require('../config/db');

const OrderItem = {
    create: async (orderId, productId, quantity) => {
        await pool.query(
            'INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)', 
            [orderId, productId, quantity]
        );
    },
    findByOrderId: async (orderId) => {
        const [rows] = await pool.query(
            `SELECT oi.*, p.name, p.price 
            FROM order_items oi 
            JOIN products p ON oi.product_id = p.id 
            WHERE oi.order_id = ?`, 
            [orderId]
        );
        return rows; // Return order items for the specific order
    },

    delete: async (id) => {
        await pool.query('DELETE FROM order_items WHERE id = ?', [id]);
    }
};

module.exports = OrderItem;
