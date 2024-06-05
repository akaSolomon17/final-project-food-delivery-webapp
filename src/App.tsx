import React from 'react'
import './App.css'

import { Route, Routes } from 'react-router-dom'

import Nav from "./components/Nav/Nav"
import Home from './pages/Home'
import Products from './pages/Products'
import CartDetails from './pages/CartDetails'
import About from './pages/About'
import SwiperComponent from './components/Swiper/SwiperComponent'


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
          <Route path="/swiper" element={<SwiperComponent/>}/>
        </Routes>
      </React.Suspense>
    </>
  )
}

export default App
