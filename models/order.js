const { pool } = require('../config/db');

const Order = {
    create: async (userId, totalPrice) => {
        const [result] = await pool.query(
            'INSERT INTO orders (user_id, total_price) VALUES (?, ?)', 
            [userId, totalPrice]
        );
        return result.insertId; // Return the ID of the created order
    },

    findAll: async () => {
        const [rows] = await pool.query(`
            SELECT o.*, u.name as user_name 
            FROM orders o
            JOIN users u ON o.user_id = u.id
        `);
        return rows; // Return all orders with associated user details
    },

    findById: async (id) => {
        const [rows] = await pool.query(`
            SELECT o.*, u.name as user_name
            FROM orders o
            JOIN users u ON o.user_id = u.id
            WHERE o.id = ?
        `, [id]);
        return rows[0]; // Return the order object if found
    },

    findByUserId: async (userId) => {
        const [rows] = await pool.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
        return rows; // Return all orders for the user
    },

    updateStatus: async (orderId, status) => {
        await pool.query('UPDATE orders SET order_status = ? WHERE id = ?', [status, orderId]);
    },
    delete: async (id) => {
        await pool.query('DELETE FROM orders WHERE id = ?', [id]);
    }
    
};

module.exports = Order;
