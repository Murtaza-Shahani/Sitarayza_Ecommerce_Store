import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "User" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    const { email, password, role } = form;
    if (!email || !password) return alert("Please fill all fields");

    // Prepare request body
    const body = role === "Admin" ? { email, password, role } : { email, password };

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", body);
      console.log("Logged in:", res.data);

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("isAdmin", res.data.isAdmin);

      alert(`Welcome ${res.data.isAdmin ? "Admin" : "User"}`);
      navigate(res.data.isAdmin ? "/dashboard" : "/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 rounded w-full mb-3"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="border p-2 rounded w-full mb-3"
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="border p-2 rounded w-full mb-3"
      >
        <option>User</option>
        <option>Admin</option>
      </select>
      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </div>
  );
}
