import React, { useState, useEffect } from "react";
import { products } from "../data/products";
import Filter from "./Filter";
import { useDispatch } from "react-redux";
import { addItem } from "@/app/slices/cartSlice";
import { Link } from "react-router-dom";

function Shop({ navCategory = "all", searchQuery = "" }) {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(navCategory);

  // Sync local category state with prop
  useEffect(() => {
    setSelectedCategory(navCategory);
  }, [navCategory]);

  // Filter products by category
  let filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Filter by search query
  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  const handleAddToCart = (product) => {
    dispatch(
      addItem({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        qty: 1,
      })
    );
  };

  return (
    <div className="flex">
      {/* LEFT FILTER */}
      <div className="w-1/4 p-4">
        <Filter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* PRODUCTS */}
      <div className="w-3/4 p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg text-center">
            <img
              src={product.image}
              alt={product.title}
              className="h-40 w-full object-cover"
            />
            <h3 className="mt-2 font-semibold">{product.title}</h3>
            <p className="text-gray-500 text-sm">{product.description}</p>
            <p className="font-bold mt-1">PKR {product.price}</p>

            <div className="mt-3 flex gap-2 justify-center">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add to Cart
              </button>
              <Link
                to={`/product/${product.id}`}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                View
              </Link>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Shop;
