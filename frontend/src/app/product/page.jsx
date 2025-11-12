// app/product/page.jsx
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import api from "@/src/app/lib/axios";
import { FaFilter, FaTags, FaSearch, FaDollarSign } from "react-icons/fa";

// 🟢 Fetch products (with filters)
async function getProducts(
  keyword = "",
  category = "",
  minPrice = "",
  maxPrice = ""
) {
  let query = "";
  if (keyword) query += `keyword=${keyword}`;
  if (category)
    query += query ? `&category=${category}` : `category=${category}`;
  if (minPrice)
    query += query ? `&minPrice=${minPrice}` : `minPrice=${minPrice}`;
  if (maxPrice)
    query += query ? `&maxPrice=${maxPrice}` : `maxPrice=${maxPrice}`;

  try {
    const res = await api.get(`/api/products${query ? "?" + query : ""}`);
    return res.data;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
}

// 🟢 Fetch categories
async function getCategories() {
  try {
    const res = await api.get("/api/products/categories");
    return res.data;
  } catch (err) {
    throw new Error("Failed to fetch categories");
  }
}

export default async function ProductPage({ searchParams }) {
  const params = await searchParams;
  const keyword = params?.keyword || "";
  const category = params?.category || "";
  const minPrice = params?.minPrice || "";
  const maxPrice = params?.maxPrice || "";

  const products = await getProducts(keyword, category, minPrice, maxPrice);
  const categories = await getCategories();

  return (
    <div className="bg-gradient-to-b from-white via-amber-50 to-white">
      {/* 🔥 Hero Section */}
      <div
        className="relative h-[40vh] sm:h-[50vh] flex flex-col items-center justify-center text-center bg-cover bg-center px-4"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url('/shop.png')",
        }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg leading-tight">
          Our <span className="text-amber-400">Collection</span>
        </h1>
        <p className="text-white font-medium mt-3 text-sm sm:text-base">
          Home / <span className="text-amber-400">Products</span>
        </p>
      </div>

      {/* 🔥 Filters Top for Mobile */}
      <div className="w-[92%] mx-auto mt-6 flex flex-col gap-4 md:hidden">
        {/* Search */}
        <div className="bg-white p-4 rounded-2xl shadow border border-gray-100 flex items-center gap-2">
          <FaSearch className="text-amber-400 text-lg" />
          <form action="/product" method="GET" className="flex flex-1 gap-2">
            <input type="hidden" name="category" value={category} />
            <input type="hidden" name="minPrice" value={minPrice} />
            <input type="hidden" name="maxPrice" value={maxPrice} />
            <input
              type="text"
              name="keyword"
              defaultValue={keyword}
              placeholder="Search products..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none text-sm"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white rounded-xl font-semibold text-sm shadow-md transition-transform hover:scale-105"
            >
              Go
            </button>
          </form>
        </div>
{/* Price Filter */}
<div className="bg-white p-4 rounded-2xl shadow border border-gray-100 flex flex-col gap-2 max-w-[300px] sm:max-w-[350px] md:max-w-[400px]">
  <div className="flex items-center gap-2 text-gray-800 font-semibold">
    <FaDollarSign className="text-amber-400" /> Price Range
  </div>
  <form action="/product" method="GET" className="flex flex-wrap gap-2">
    <input type="hidden" name="keyword" value={keyword} />
    <input type="hidden" name="category" value={category} />

    <input
      type="number"
      name="minPrice"
      placeholder="Min"
      defaultValue={minPrice}
      className="flex-1 min-w-[100px] sm:min-w-[120px] px-2 py-1 border rounded-xl text-sm focus:ring-amber-400 outline-none"
    />
    <input
      type="number"
      name="maxPrice"
      placeholder="Max"
      defaultValue={maxPrice}
      className="flex-1 min-w-[100px] sm:min-w-[120px] px-2 py-1 border rounded-xl text-sm focus:ring-amber-400 outline-none"
    />

    <button
      type="submit"
      className="w-full mt-2 px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white rounded-xl font-semibold text-sm shadow-md transition-transform hover:scale-105"
    >
      Apply
    </button>
  </form>
</div>


      </div>

      {/* 🔥 Shop Layout */}
      <div className="w-[92%] mx-auto py-10 flex flex-col md:flex-row gap-8">
        {/* LEFT - Filters Sidebar for Desktop */}
        <div className="md:w-1/4 w-full hidden md:flex flex-col space-y-6">
          {/* Search Box */}
          <div className="bg-white p-5 rounded-2xl shadow border border-gray-100">
            <h2 className="font-bold mb-4 text-lg text-gray-800 flex items-center gap-2">
              <FaSearch className="text-amber-400" /> Search
            </h2>
            <form action="/product" method="GET" className="flex">
              <input type="hidden" name="category" value={category} />
              <input type="hidden" name="minPrice" value={minPrice} />
              <input type="hidden" name="maxPrice" value={maxPrice} />
              <input
                type="text"
                name="keyword"
                defaultValue={keyword}
                placeholder="Search products..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-xl focus:ring-2 focus:ring-amber-400 outline-none text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white rounded-r-xl font-semibold text-sm shadow-md transition-transform hover:scale-105"
              >
                Search
              </button>
            </form>
          </div>

         {/* Category & Price Filters Wrapper */}
<div className="flex flex-col gap-3 sm:gap-1 md:gap-6">
  {/* Category Filter */}
  <div className="bg-white p-4 sm:p-5 rounded-2xl shadow border border-gray-100">
    <h2 className="font-bold mb-3 sm:mb-4 text-md sm:text-lg text-gray-800 flex items-center gap-2">
      <FaTags className="text-amber-400" /> Categories
    </h2>
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/product?category=${cat}`}
          className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-sm font-medium transition-all duration-300
            ${
              category === cat
                ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
            }`}
        >
          {cat}
        </Link>
      ))}
      <Link
        href="/product"
        className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-sm font-medium transition-all duration-300
          ${
            !category
              ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-md scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
          }`}
      >
        All
      </Link>
    </div>
  </div>

  {/* 💰 Price Filter */}
  <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-lg border border-gray-100 max-w-full sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px]">
    <h2 className="font-bold mb-3 sm:mb-6 text-md sm:text-lg text-gray-800 flex items-center gap-2">
      <span className="w-1.5 h-5 sm:h-6 bg-amber-400 rounded-full"></span>
      Price Range
    </h2>
    <form action="/product" method="GET" className="flex flex-col gap-2 sm:gap-3">
      <input type="hidden" name="keyword" value={keyword} />
      <input type="hidden" name="category" value={category} />

      <div className="flex items-center gap-2 sm:gap-3">
        <input
          type="number"
          name="minPrice"
          placeholder="Min"
          defaultValue={minPrice}
          className="w-1/2 px-2 sm:px-3 py-2 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-amber-400 outline-none"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max"
          defaultValue={maxPrice}
          className="w-1/2 px-2 sm:px-3 py-2 border rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-amber-400 outline-none"
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white font-semibold py-2 text-sm sm:text-base rounded-xl shadow-md transition-transform hover:scale-105"
      >
        Apply
      </button>
    </form>
  </div>
</div>

        </div>

        {/* RIGHT - Products */}
        <div className="md:w-3/4 w-full">
          {category && (
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
              {category} Products
            </h2>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="transform transition duration-300 hover:scale-105"
                >
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-lg col-span-full text-center">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
