// server.js

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Configure bodyParser to parse JSON
app.use(bodyParser.json());

// MongoDB connection URI
const MONGODB_URI = 'mongodb://localhost:27017/Product';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define schema for the Product collection
const productSchema = new mongoose.Schema({
    ProductID: Number,
    ProductName: String,
    ValidityPeriod: Number,
    ProductCost: Number
});

// Create a model based on the schema
const Product = mongoose.model('Product', productSchema);

// CRUD operations

// Create operation
app.post('/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Retrieve operation
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//mongoimport --db Product --collection products --file products.json --jsonArray
