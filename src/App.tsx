import React from 'react'
import './App.css'

import { Route, Routes } from 'react-router-dom'

import Nav from "./components/Nav/Nav"
import Home from './pages/Home'
import Products from './pages/Products/Products'
import CartDetails from './pages/CartDetails'
import YourOrder from './pages/YourOrder'
import Footer from './components/Footer/Footer'
import ProductsManagement from './pages/ProductsManagement'
import ProductDetails from './pages/Products/ProductDetails'


function App() {

  return (
    <>
      <Nav />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Products />} />
          <Route path='/cart-detail' element={<CartDetails />} />
          <Route path='/your-order' element={<YourOrder />} />
          <Route path="/product-details/:productId" element={<ProductDetails />} />
          <Route path="/managements" element={<ProductsManagement />} />
        </Routes>
      </React.Suspense>
      <Footer />
    </>
  )
}

export default App
