const { pool } = require('../config/db');

const Product = {
    create: async (name, description, price, image, stockQuantity, categoryId, newCategory) => {
        let actualCategoryId = categoryId;

        // If a new category is provided, add it to the database first
        if (newCategory) {
            try {
                const result = await this.addCategory(newCategory);
                actualCategoryId = result.insertId; 
            } catch (error) {
                console.error('Error adding new category:', error);
                throw new Error('Could not create new category');
            }
        }

        // Build the query based on whether actualCategoryId is present
        const query = actualCategoryId
            ? 'INSERT INTO products (name, description, price, image_path, stock_quantity, category_id) VALUES (?, ?, ?, ?, ?, ?)'
            : 'INSERT INTO products (name, description, price, image_path, stock_quantity) VALUES (?, ?, ?, ?, ?)';

        const values = actualCategoryId
            ? [name, description, price, image, stockQuantity, actualCategoryId]
            : [name, description, price, image, stockQuantity];

        console.log('SQL Query:', query);  // Log the query for debugging
        console.log('Values:', values);     // Log the values for debugging

        try {
            const [result] = await pool.query(query, values); // Get the result from the query
            return result; // Optionally return the result for further use
        } catch (error) {
            console.error('Error creating product:', error);
            throw new Error('Could not create product'); // Throw a more descriptive error
        }
    },

    addCategory: async (name) => {
        const [result] = await pool.query('INSERT INTO categories (name) VALUES (?)', [name]);
        return result;
    },


    findById: async (productId) => {
        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
        return rows[0]; // Return the product object if found
    },
    update: async (id, updates) => {
        const { name, description, price, image, stockQuantity, categoryId } = updates;
        
        // Prepare the query and values dynamically based on the fields provided
        const setFields = [];
        const values = [];
        
        if (name !== undefined) {
            setFields.push('name = ?');
            values.push(name);
        }
        
        if (description !== undefined) {
            setFields.push('description = ?');
            values.push(description);
        }
    
        if (price !== undefined) {
            setFields.push('price = ?');
            values.push(price);
        }
    
        if (image !== undefined) {
            setFields.push('image_path = ?');
            values.push(image);
        }
    
        if (stockQuantity !== undefined) {
            setFields.push('stock_quantity = ?');
            values.push(stockQuantity);
        }
    
        if (categoryId !== undefined) {
            setFields.push('category_id = ?');
            values.push(categoryId);
        }
        
        // Add the product ID to the end of the values for the WHERE clause
        values.push(id);
        
        // Only construct the query if there's at least one field to update
        if (setFields.length > 0) {
            const query = `UPDATE products SET ${setFields.join(', ')} WHERE id = ?`;
            
            try {
                const result = await pool.query(query, values);
                return result; // Optionally return the result for further use
            } catch (error) {
                console.error('Error updating product:', error);
                throw new Error('Could not update product');
            }
        } else {
            throw new Error('No fields to update');
        }
    },
    
    findAllWithCategory: async () => {
        const query = `
            SELECT 
                p.id, p.name, p.description, p.price, p.image_path, p.stock_quantity, 
                c.name AS category_name
            FROM 
                products p
            JOIN 
                categories c ON p.category_id = c.id
        `;
        const [rows] = await pool.query(query);
        return rows; // Return the products with category names
    },

    findAll: async (categoryId) => { //set null if error
        let query = 'SELECT * FROM products';
        const values = [];

        if (categoryId) {
            query += ' WHERE category_id = ?'; 
            values.push(categoryId);            
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
    },

};

module.exports = Product;
