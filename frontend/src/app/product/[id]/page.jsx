import React from 'react';

async function getProduct(id) {
  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-black to-gray-900 text-white flex items-center justify-center p-6">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-5xl flex flex-col md:flex-row gap-10 transition-all duration-300">
        
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="w-full md:w-[45%] h-auto rounded-2xl object-cover shadow-lg"
        />

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-pink-300 mb-4">{product.title}</h1>
          <p className="text-2xl font-bold text-yellow-400 mb-4">${product.price}</p>
          <p className="text-white/80 mb-6 text-lg leading-relaxed">{product.description}</p>

          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300 w-fit">
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
