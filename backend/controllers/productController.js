import Product from '../models/Product.js';
import mongoose from "mongoose"; 

// 🟢 Public: Get All Products (Aggregation)
export const getAllProducts = async (req, res) => {
  try {
    const { keyword, category, minPrice, maxPrice } = req.query;

    const pipeline = [];

    // Keyword filter
    if (keyword) {
      pipeline.push({
        $match: {
          title: { $regex: keyword, $options: "i" }
        }
      });
    }

    // Category filter
    if (category) {
      pipeline.push({
        $match: {
          category: category
        }
      });
    }

    // Price filter
    if (minPrice && maxPrice) {
      pipeline.push({
        $match: {
          price: { $gte: Number(minPrice), $lte: Number(maxPrice) }
        }
      });
    }

    // Default sort by created date (latest first)
    pipeline.push({ $sort: { createdAt: -1 } });

    const products = await Product.aggregate(pipeline);
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 🟢 Public: Get Top 5 Rated (Aggregation)
export const getTopProducts = async (req, res) => {
  try {
    const top = await Product.aggregate([
      { $sort: { rating: -1 } },
      { $limit: 5 }
    ]);
    res.json(top);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 🔴 Admin Only: Create Product
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, brand, countInStock } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = new Product({
      title,
      description,
      price,
      image,
      category,
      brand,
      countInStock,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// 🔴 Admin Only: Update Product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ msg: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 🔴 Admin Only: Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    await product.deleteOne();
    res.json({ msg: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 🟢 Public: Get Single Product (Aggregation)
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid product ID" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });  // ✅ 404 not 200
    }

    res.json(product);  // ✅ proper object
  } catch (err) {
    console.error("Error fetching product:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};



// 🟢 Public: Get all unique categories (Aggregation)
export const getCategories = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $group: { _id: "$category" } },
      { $project: { _id: 0, category: "$_id" } }
    ]);
    res.json(categories.map(c => c.category));
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
