const { pool } = require('../config/db');

const Order = {
    create: async (userId, totalPrice, orderStatus = 'Pending') => {
        const [result] = await pool.query(
            'INSERT INTO orders (user_id, total_price, order_status) VALUES (?, ?, ?)', 
            [userId, totalPrice, orderStatus]
        );
        return result.insertId; // Return the new order ID
    },

    findById: async (orderId) => {
        const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [orderId]);
        return rows[0]; // Return the order object if found
    },

    findByUserId: async (userId) => {
        const [rows] = await pool.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
        return rows; // Return all orders for the user
    },

    updateStatus: async (orderId, orderStatus) => {
        await pool.query('UPDATE orders SET order_status = ? WHERE id = ?', [orderStatus, orderId]);
    }
};

module.exports = Order;
