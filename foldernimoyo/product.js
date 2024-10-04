const { pool } = require('../config/db');

const Product = {
    create: async (name, description, price, image, stockQuantity, categoryId) => {
        await pool.query(
            'INSERT INTO products (name, description, price, image, stock_quantity, category_id) VALUES (?, ?, ?, ?, ?, ?)', 
            [name, description, price, image, stockQuantity, categoryId]
        );
    },

    findById: async (productId) => {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
        return rows[0]; // Return the product object if found
    },

    findAll: async () => {
        const [rows] = await pool.query('SELECT * FROM products');
        return rows; // Return all products
    },

    updateStock: async (productId, stockQuantity) => {
        await pool.query('UPDATE products SET stock_quantity = ? WHERE id = ?', [stockQuantity, productId]);
    },

    delete: async (productId) => {
        await pool.query('DELETE FROM products WHERE id = ?', [productId]);
    }
};

module.exports = Product;
