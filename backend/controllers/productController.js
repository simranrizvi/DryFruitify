import Product from '../models/Product.js';

// 🟢 Public: Get All Products
export const getAllProducts = async (req, res) => {
  // search by keyword (product title)
  const keyword = req.query.keyword
    ? { title: { $regex: req.query.keyword, $options: "i" } }
    : {};

  // filter by category
  const categoryFilter = req.query.category
    ? { category: req.query.category }
    : {};

  // merge both conditions
  const filter = { ...keyword, ...categoryFilter };

  const products = await Product.find(filter);
  res.json(products);
};


// 🟢 Public: Get Top 5 Rated
export const getTopProducts = async (req, res) => {
  const top = await Product.find().sort({ rating: -1 }).limit(5);
  res.json(top);
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
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ msg: 'Product not found' });

  Object.assign(product, req.body); // updates only provided fields
  const updated = await product.save();
  res.json(updated);
};

// 🔴 Admin Only: Delete Product
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ msg: 'Product not found' });

  await product.remove();
  res.json({ msg: 'Product deleted' });
};

// 🟢 Public: Get Single Product
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ msg: 'Product not found' });
  res.json(product);
};

// 🟢 Public: Get all unique categories
export const getCategories = async (req, res) => {
  const categories = await Product.distinct("category");
  res.json(categories);
};