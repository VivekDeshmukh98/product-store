// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { CartContext } from "./context/CartContext";
import { useEffect, useState } from "react";
import type { CartItem } from "./context/CartContext";
import { Cart } from "./pages/Cart";
import { Navbar } from "./components/Navbar";

function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  return (
  <CartContext.Provider value={{ cart, setCart }}>
    <BrowserRouter>
      <Navbar />  {/* ✅ Inside BrowserRouter, above Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </CartContext.Provider>
)
}

export default App;
