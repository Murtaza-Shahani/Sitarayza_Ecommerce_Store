// src/components/ShippingForm.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCartItems, selectTotal, selectShipping } from "@/app/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function ShippingForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectCartItems);
  const total = useSelector(selectTotal);
  const shipping = useSelector(selectShipping);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    payment: "cod", // cash on delivery default
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    // Simple validation
    const requiredFields = ["name", "email", "phone", "address", "city", "state", "zip"];
    for (let field of requiredFields) {
      if (!form[field]) {
        return alert(`Please fill ${field}`);
      }
    }

    // Simulate order placement
    console.log("Order details:", {
      customer: form,
      items,
      total,
      shipping,
    });

    dispatch(clearCart()); // clear the cart
    setOrderPlaced(true);
  };

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-500">
        Your cart is empty. <button onClick={() => navigate("/shop")} className="text-blue-500 underline">Go to Shop</button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
        <p>Thank you, {form.name}! Your order has been received.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Shipping & Billing Information</h2>

      <div className="grid gap-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="border px-3 py-2 rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="border px-3 py-2 rounded" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border px-3 py-2 rounded" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border px-3 py-2 rounded" />
        <div className="grid grid-cols-2 gap-4">
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border px-3 py-2 rounded" />
          <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="border px-3 py-2 rounded" />
        </div>
        <input name="zip" value={form.zip} onChange={handleChange} placeholder="Zip / Postal Code" className="border px-3 py-2 rounded" />

        {/* Payment option */}
        <div className="mt-2">
          <label className="font-medium">Payment Method:</label>
          <div className="flex items-center gap-4 mt-1">
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" value="cod" checked={form.payment === "cod"} onChange={handleChange} />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="payment" value="card" checked={form.payment === "card"} onChange={handleChange} />
              Card Payment (placeholder)
            </label>
          </div>
        </div>

        {/* Place Order button */}
        <button
          onClick={handlePlaceOrder}
          className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
