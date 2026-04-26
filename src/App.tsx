// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { ProductDetail } from './components/ProductDetail'

function App() {

  return (
    // <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
       <Route path='*' element={<div>404 Not Found</div>} />

    </Routes>
    </BrowserRouter>
    // </div>    
  )
}

export default App
