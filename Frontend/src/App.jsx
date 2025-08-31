import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import CartDrawer from './features/cart/CartDrawer';
import Checkout from './components/Checkout';
import OrderDashboard from './components/OrderDashboard'; // <-- import dashboard

function App() {
  return (
    <>
      <Navbar
        isAuthenticated={false}   // from auth state
        isAdmin={true}           // admin can access dashboard
        onSearch={(q) => console.log("search:", q)}
      />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/dashboard" element={<OrderDashboard/>} /> {/* New dashboard route */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
