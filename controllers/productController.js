const Product = require('../models/product');

const ProductController = {
    create: async (req, res) => {
        const { name, description, price, image, stock_quantity, category_id } = req.body;

        try {
            await Product.create(name, description, price, image, stock_quantity, category_id);
            res.status(201).json({ message: 'Product created successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Error creating product.', error: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const selectedCategoryId = req.query.categoryId || null; // Get the selected categoryId from the query
            const products = await Product.findAll(selectedCategoryId); // Fetch products based on the category
            const categories = await Product.getCategories(); // Fetch categories for the filter

            // Render the shop page with products and categories
            res.render('shop', {
                products,
                categories,
                selectedCategoryId, // Pass the selected categoryId to maintain the selected state
                title: 'Shop'
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).send('Internal Server Error'); // Handle error response
        }
    },

    getById: async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId); // Fetch product by ID
            console.log('Product image path: ', product.image_path);
            res.render('product', { product, title: product.name });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving product.', error: error.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;

        try {
            await Product.update(id, updates);
            res.status(200).json({ message: 'Product updated successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Error updating product.', error: error.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;

        try {
            await Product.delete(id);
            res.status(200).json({ message: 'Product deleted successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product.', error: error.message });
        }
    }
};

module.exports = ProductController;
