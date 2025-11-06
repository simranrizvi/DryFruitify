// app/product/page.jsx
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import api from "@/src/app/lib/axios"; // ✅ centralized axios instance

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
    <div className="bg-gradient-to-b from-white via-amber-50 to-white ">
      {/* 🔥 Hero Section */}
      <div
        className="relative h-[55vh] flex flex-col items-center justify-center text-center bg-cover bg-center pt-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url('/shop.png')",
        }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
          Our <span className="text-amber-400">Collection</span>
        </h1>
        <p className="text-white font-medium mt-4">
          Home / <span className="text-amber-400">Products</span>
        </p>
      </div>

      {/* 🔥 Shop Layout */}
      <div className="min-h-screen w-[90%] mx-auto py-12 flex flex-col md:flex-row gap-10">
        {/* LEFT - Filters */}
        <div className="md:w-1/4 w-full space-y-8">
          {/* 🔍 Search Box */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="font-bold mb-6 text-lg text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-amber-400 rounded-full"></span>
              Search
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
                className="flex-1 px-2 py-2 border border-gray-300 rounded-l-xl focus:ring-2 focus:ring-amber-400 outline-none text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white rounded-r-xl font-semibold text-sm shadow-md transition-transform hover:scale-105"
              >
                Search
              </button>
            </form>
          </div>

          {/* 🟡 Category Filter */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="font-bold mb-6 text-lg text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-amber-400 rounded-full"></span>
              Categories
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/product?category=${cat}`}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${
                      category === cat
                        ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-md scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                    }`}
                >
                  {cat}
                </Link>
              ))}

              {/* Clear filter */}
              <Link
                href="/product"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
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
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="font-bold mb-6 text-lg text-gray-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-amber-400 rounded-full"></span>
              Price Range
            </h2>
            <form
              action="/product"
              method="GET"
              className="flex flex-col gap-4"
            >
              <input type="hidden" name="keyword" value={keyword} />
              <input type="hidden" name="category" value={category} />

              <div className="flex items-center gap-3">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  defaultValue={minPrice}
                  className="w-1/2 px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-amber-400 outline-none"
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  defaultValue={maxPrice}
                  className="w-1/2 px-3 py-2 border rounded-xl text-sm focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white font-semibold py-2 text-sm rounded-xl shadow-md transition-transform hover:scale-105"
              >
                Apply
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT - Products */}
        <div className="md:w-3/4 w-full">
          {category && (
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {category} Products
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <p className="text-gray-500 text-lg">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
