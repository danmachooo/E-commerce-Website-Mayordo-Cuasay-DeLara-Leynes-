const { pool } = require('../config/db');

const Order = {
    create: async (userId, totalPrice) => {
        const [result] = await pool.query(
            'INSERT INTO orders (user_id, total_price) VALUES (?, ?)', 
            [userId, totalPrice]
        );
        return result.insertId; // Return the ID of the created order
    },

    findById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
        return rows[0]; // Return the order object if found
    },

    findByUserId: async (userId) => {
        const [rows] = await pool.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
        return rows; // Return all orders for the user
    },

    updateStatus: async (orderId, status) => {
        await pool.query('UPDATE orders SET order_status = ? WHERE id = ?', [status, orderId]);
    }
};

module.exports = Order;
