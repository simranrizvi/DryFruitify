// app/shop/page.jsx
import Link from "next/link";
import ProductCard from "../components/ProductCard";

// 🟢 Fetch products (with filters)
async function getProducts(keyword = "", category = "") {
  let query = "";
  if (keyword) query += `keyword=${keyword}`;
  if (category) query += query ? `&category=${category}` : `category=${category}`;

  const res = await fetch(
    `http://localhost:5000/api/products${query ? "?" + query : ""}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

// 🟢 Fetch categories
async function getCategories() {
  const res = await fetch("http://localhost:5000/api/products/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const keyword = params?.keyword || "";
  const category = params?.category || "";

  const products = await getProducts(keyword, category);
  const categories = await getCategories();

  return (
    <div className="bg-gradient-to-b from-white via-amber-50 to-white">
      {/* 🔥 Hero Section */}
      <div
        className="relative h-[55vh] flex flex-col items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url('/about.webp')",
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
        {/* LEFT - Category Filter */}
        <div className="md:w-1/4 w-full">
          <h2 className="font-bold mb-6 text-xl text-gray-800">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/product?category=${cat}`}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm
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
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm
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

        {/* RIGHT - Products */}
        <div className="md:w-3/4 w-full">
          {/* 🔎 Search Box */}
          <form
            action="/product"
            method="GET"
            className="flex items-center mb-8 bg-gray-100 rounded-full px-4 py-2 shadow-sm"
          >
            <input
              type="text"
              name="keyword"
              defaultValue={keyword}
              placeholder="Search products..."
              className="flex-grow bg-transparent outline-none px-2 text-sm text-black"
            />
            <button
              type="submit"
              className="text-yellow-600 font-semibold hover:text-yellow-700 transition"
            >
              Search
            </button>
          </form>

          {/* Product Grid */}
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
