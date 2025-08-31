// src/components/Shop.jsx
import React, { useState } from "react";
import { products } from "../data/products";
import { Link } from "react-router-dom";
import { addItem } from "@/app/slices/cartSlice";
import { useDispatch } from "react-redux";

function Shop() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (category) => setSelectedCategory(category);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleAddToCart = (product) => {
    dispatch(
      addItem({
        id: product.id,
        slug: product.slug || "",
        name: product.title,  // ✅ map title to name
        price: product.price,
        image: product.image,
        qty: 1,
      })
    );
  };

  return (
    <div className="flex">
      {/* Filters Section */}
      <div className="w-1/4 p-4">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="border rounded-lg shadow-sm p-4">
          <h3 className="font-bold text-lg mb-4">Category</h3>
          <div className="space-y-3">
            {["all", "men", "women", "child"].map((cat) => (
              <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => handleCategoryChange(cat)}
                  className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-pink-400"
                />
                <span>{cat === "child" ? "Kids" : cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="w-3/4 p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg flex flex-col items-center">
            <img src={product.image} alt={product.title} className="h-40 w-full object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{product.description}</p>
            <p className="text-lg font-bold mt-2">PKR {product.price}</p>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
              <Link to={`/product/${product.id}`} className="px-4 py-2 bg-gray-200 rounded-md">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
