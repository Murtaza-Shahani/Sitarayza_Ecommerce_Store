import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Shop from "./components/Shop";
import ProductDetail from "./components/ProductDetail";
import Footer from "./components/Footer";
import CartDrawer from "./features/cart/CartDrawer";
import Checkout from "./components/Checkout";
import OrderDashboard from "./components/OrderDashboard";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ContactForm from "./components/ContactForm";
import AnnouncementBar from "./components/AnnouncementBar";

function App() {
  const [navCategory, setNavCategory] = useState("all"); // selected category
  const [searchQuery, setSearchQuery] = useState("");     // search query

  return (
    <>
      <AnnouncementBar />
      <Navbar
        onSearch={(q) => setSearchQuery(q)}
        onCategorySelect={(category) => setNavCategory(category)}
      />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={
            <Shop navCategory={navCategory} searchQuery={searchQuery} />
          }
        />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<OrderDashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
