// src/components/OrderDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/orders/${id}/status`, { status });
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? res.data : o))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const cancelOrder = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading orders...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Orders Dashboard</h1>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">Customer Info</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Items</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Payment</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-2 border">{order._id.slice(-6)}</td>

                  <td className="px-4 py-2 border">
                    <strong>{order.customer.name}</strong><br/>
                    {order.customer.email}<br/>
                    {order.customer.phone}
                  </td>

                  <td className="px-4 py-2 border">
                    {order.customer.address}<br/>
                    {order.customer.city}, {order.customer.state} - {order.customer.zip}
                  </td>

                  <td className="px-4 py-2 border">
                    {order.items.map((item) => (
                      <div key={item.id}>
                        {item.name} x {item.qty} (PKR {item.price})
                      </div>
                    ))}
                  </td>

                  <td className="px-4 py-2 border">PKR {order.total.toLocaleString()}</td>
                  <td className="px-4 py-2 border">{order.payment.method} ({order.payment.status})</td>
                  <td className="px-4 py-2 border">{order.orderStatus}</td>
                  <td className="px-4 py-2 border">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2 border flex flex-col gap-1">
                    {order.orderStatus === "pending" && (
                      <button
                        onClick={() => updateStatus(order._id, "delivered")}
                        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                      >
                        Mark as Delivered
                      </button>
                    )}
                    <button
                      onClick={() => cancelOrder(order._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
