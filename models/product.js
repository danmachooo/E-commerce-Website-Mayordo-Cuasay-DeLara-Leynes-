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
    update: async (id, updates) => {
            const { name, description, price, image, stockQuantity, categoryId } = updates;
            await pool.query(
                'UPDATE products SET name = ?, description = ?, price = ?, image_path = ?, stock_quantity = ?, category_id = ? WHERE id = ?', 
                [name, description, price, image, stockQuantity, categoryId, id]
            );
        },

    findAll: async (categoryId) => {
        let query = 'SELECT * FROM products';
        const values = [];

        if (categoryId) {
            query += ' WHERE category_id = ?'; // Using the placeholder for parameter binding
            values.push(categoryId);             // Adding the categoryId to the values array
        }

        console.log('SQL Query:', query);  // Log the query for debugging
        console.log('Values:', values);     // Log the values for debugging

        const [rows] = await pool.query(query, values); // Execute the query with the values
        return rows; // Return the fetched rows
    },
    getCategories: async () => {
        const [rows] = await pool.query('SELECT * FROM categories'); // Fetch all categories
        return rows; // Return the categories
    },

    updateStock: async (productId, stockQuantity) => {
        await pool.query('UPDATE products SET stock_quantity = ? WHERE id = ?', [stockQuantity, productId]);
    },
    

    delete: async (productId) => {
        await pool.query('DELETE FROM products WHERE id = ?', [productId]);
    }
};

module.exports = Product;
