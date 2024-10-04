const { pool } = require('../config/db'); // Adjust the path as necessary

const Product = {
    // Method to create a new product
    create: async (name, description, price, image, stock_quantity, category_id) => {
        await pool.query(
            'INSERT INTO products (name, description, price, image, stock_quantity, category_id) VALUES (?, ?, ?, ?, ?, ?)', 
            [name, description, price, image, stock_quantity, category_id]
        );
    },

    // Method to find all products
    findAll: async () => {
        const [rows] = await pool.query('SELECT * FROM products');
        return rows; // Return all products
    },

    // Method to find a product by ID
    findById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0]; // Return the product object if found
    },

    // Method to update a product by ID
    update: async (id, updatedProduct) => {
        const { name, description, price, image, stock_quantity, category_id } = updatedProduct;
        await pool.query(
            'UPDATE products SET name = ?, description = ?, price = ?, image = ?, stock_quantity = ?, category_id = ? WHERE id = ?', 
            [name, description, price, image, stock_quantity, category_id, id]
        );
    },

    // Method to delete a product by ID
    delete: async (id) => {
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
    }
};

module.exports = Product;
