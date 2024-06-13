import React from 'react'
import './App.css'

import { Route, Routes } from 'react-router-dom'

import Nav from "./components/Nav/Nav"
import Home from './pages/Home'
import Products from './pages/Products/Products'
import CartDetails from './pages/CartDetails'
import About from './pages/About'
import Footer from './components/Footer/Footer'
import ProductDetails from './pages/Products/ProductDetails'
import SliderUI from "./pages/SliderUI"


function App() {

  return (
    <>
      <Nav />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Products />} />
          <Route path='/cart-detail' element={<CartDetails />} />
          <Route path='/about' element={<About />} />
          <Route path="/swiper" element={<SliderUI />} />
          <Route path="/product-details/:productId" element={<ProductDetails />} />
        </Routes>
      </React.Suspense>
      <Footer />
    </>
  )
}

export default App
