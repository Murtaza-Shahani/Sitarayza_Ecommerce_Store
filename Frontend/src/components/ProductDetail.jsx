// src/components/ProductDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products"; // Import your product data
import { useDispatch } from "react-redux";
import { addItem } from "@/app/slices/cartSlice"; // Redux action for cart

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = products.find((item) => item.id === parseInt(id));

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-6">
          <img
            src={product.image}
            alt={product.title}
            className="w-1/2 h-80 object-cover rounded-2xl"
          />
          <div className="w-1/2">
            <h2 className="text-2xl font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-500 mt-2">{product.description}</p>
             <p className="text-sm text-gray-500 mt-2">{product.category}</p>
              <p className="text-sm text-gray-500 mt-2">{product.size}</p>
            <p className="text-lg font-bold mt-4">PKR {product.price}</p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleAddToCart}
                className="px-6 py-3 bg-blue-500 text-white rounded-md"
              >
                Add to Cart
              </button>
              <button className="px-6 py-3 bg-gray-200 rounded-md">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
