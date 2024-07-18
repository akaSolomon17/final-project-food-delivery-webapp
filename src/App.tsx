import React from "react";
import "./App.css";

import { Route, Routes, useLocation } from "react-router-dom";

import { Nav } from "./components/Nav/Nav";
import Home from "./pages/Home";
import ProductsPage from "./pages/Products/ProductsPage";
import ProductsManagement from "./pages/ProductsManagement";
import ProductDetails from "./pages/Products/ProductDetails";
import CartSidebar from "./components/CartSidebar/CartSidebar";
import Checkout from "./pages/Checkout";
import { ToastNotifier } from "./hooks/Toastify/Toastify";
import Loading from "./components/Loading/Loading";
import YourOrder from "./components/YourOrder/YourOrder";

function App() {
  const location = useLocation();

  return (
    <>
      <CartSidebar />
      <ToastNotifier />
      <Nav isCheckoutPage={location.pathname == "/checkout"} />
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<ProductsPage />} />
          <Route path="/your-order" element={<YourOrder />} />
          <Route
            path="/product-details/:productId"
            element={<ProductDetails />}
          />
          <Route path="/managements" element={<ProductsManagement />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </React.Suspense>
      {/* {location.pathname !== "/checkout" && <Footer />} */}
    </>
  );
}

export default App;
