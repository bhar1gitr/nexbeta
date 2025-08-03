const User = require('../models/userSchema');
const { v4: uuidv4 } = require('uuid'); // to generate unique product IDs

// CREATE PRODUCT
const createProduct = async (req, res) => {
    try {
        const { userId, title, description, price, image } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const newProduct = {
            id: uuidv4(),
            title,
            description,
            price,
            image
        };

        user.products.push(newProduct);
        await user.save();

        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {
        const { userId, id, title, description, price } = req.body;
        console.log("price", price)

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        // console.log(user.products)
        const product = user.products.find(prod => prod.id === id);
        // console.log(product)
        if (!product) return res.status(404).json({ message: 'Product not found' });


        // Update fields
        if (title) product.title = title;
        if (description) product.description = description;
        if (price) product.price = price;

        // Force Mongoose to detect subdocument change
        user.markModified('products');
        await user.save();

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const initialLength = user.products.length;
        user.products = user.products.filter(prod => prod.id !== productId);

        if (user.products.length === initialLength) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await user.save();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// FETCH PRODUCTS
const fetchProducts = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ products: user.products });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createProduct, updateProduct, deleteProduct, fetchProducts };
