// src/components/Shop.jsx
import React, { useState } from "react";
import { products } from "../data/products"; // Import your product data
import { Link } from "react-router-dom"; // For navigation
import { addItem } from "@/app/slices/cartSlice"; // Redux action for cart
import { useDispatch } from "react-redux";

function Shop() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="flex">
      {/* Filters Section */}
      <div className="w-1/4 p-4">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="mb-4">
          <h3 className="font-medium">Category</h3>
          <button
            className="block w-full py-2 mt-2 text-sm text-left"
            onClick={() => handleCategoryChange("all")}
          >
            All
          </button>
          <button
            className="block w-full py-2 mt-2 text-sm text-left"
            onClick={() => handleCategoryChange("men")}
          >
            Men
          </button>
          <button
            className="block w-full py-2 mt-2 text-sm text-left"
            onClick={() => handleCategoryChange("women")}
          >
            Women
          </button>
          <button
            className="block w-full py-2 mt-2 text-sm text-left"
            onClick={() => handleCategoryChange("child")}
          >
            Kids
          </button>
        </div>
        {/* Additional filters like price and size can go here */}
      </div>

      {/* Products Section */}
      <div className="w-3/4 p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{product.description}</p>
            <p className="text-lg font-bold mt-2">PKR {product.price}</p>

            <div className="mt-4 flex gap-2">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <Link
                to={`/product/${product.id}`}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
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
