import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import CartDrawer from './features/cart/CartDrawer';

function App() {
  return (
    <>
      <Navbar
        isAuthenticated={false}   // from auth state
        isAdmin={false}           // from user role
        onSearch={(q) => console.log("search:", q)}
      />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
