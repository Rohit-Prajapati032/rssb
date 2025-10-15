import React from "react";
import { Routes, Route } from "react-router-dom";

import ContactForm from "./modules/Pages/ContactForm";
import Home from "./modules/Pages/Home";
import Login from "./modules/Pages/Login";
import Register from "./modules/Pages/Register";
import ServicesPage from "./modules/Pages/ServicesPage";
import AddProduct from "./modules/Product/components/AddProductForm";
import ProductDetails from "./modules/Product/Pages/ProductDetailsPage";
import Navbar from "./shared/components/Navbar";
import PrivateRoute from "./modules/Auth/components/PrivateRoute";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
         
          } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Protected Routes */}
        <Route
          path="/addProduct"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
