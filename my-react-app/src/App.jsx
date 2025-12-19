import React from "react"; // <-- Add this

// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

/* CONTEXT */
import { AuthProvider } from "./components/Auth/AuthContext";
import { CartProvider } from "./components/Cart/CartContext";

/* NAV */
import Navbar from "./components/Navbar/NavBar";

/* AUTH */
import AuthPage from "./components/Auth/AuthPage";

/* DASHBOARD */
import Dashboard from "./components/Dashboard/Dashboard";

/* ADMIN */
import Users from "./components/Admin/components/UsersTable.jsx";
import AdminPage from "./components/Admin/AdminPage";
import Orders from "./components/Admin/components/orders";
import Products from "./components/Admin/components/Product";
import AdminDashboard from "./components/Admin/components/AdminDashboard";

/* CUSTOMER */
import HomePage from "./components/IndexPage/HomePage";
import ProfilePage from "./components/Customer/Profile Page/profilePage.jsx";
import ProfilePage2 from "./components/Customer/Profile Page/profilePage2.jsx";
import CustomerLayout from "./components/Customer/CustomerLayout";
import SimpleProfile from "./components/Customer/Profile Page/newprofile/SimpleProfile.jsx";

/* PRODUCTS */
import ProductLayout from "./components/Product/ProductLayout.jsx";
import ProductDetails from "./components/Product/ProductDetails.jsx";
import CartPage from "./components/Cart/CartPage.jsx"; // Cart page
import ProductCard from "./components/Product/Product/ProductCard.jsx";
import CatergoryContent from "./components/Product/caregory/CatergoryContent.jsx";
import ProductContent from "./components/Product/Product/ProductContent.jsx";
import ProductPage from "./components/Product/Product/ProductPage.jsx";

import CheckoutPage from "./components/Checkout/CheckoutPage";
import OrderConfirmationPage from "./components/Checkout/OrderConfirmationPage";

import UserDashboard from "./components/Admin/components/UserDashboard"; 

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* ================= DASHBOARD ================= */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ================= ADMIN ================= */}
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
              <Route path="users/:userId" element={<UserDashboard />} /> {/* <-- New Route */}

          </Route>

          {/* ================= CUSTOMER ================= */}
          <Route element={<CustomerLayout />}>
            {/* Home */}
            <Route path="/" element={<HomePage />} />

            {/* Auth */}
            <Route path="/login" element={<AuthPage />} />

            {/* Profile */}
            <Route path="/profile" element={<SimpleProfile />} />
            {/* <Route path="/profile" element={<ProfilePage2 />} /> */}
            <Route path="/profile2" element={<ProfilePage />} />

            {/* Products */}
            <Route path="/products" element={<ProductLayout />}>
              <Route index element={<ProductContent />} />
              <Route path="career_fields" element={<CatergoryContent Categories="career" />} />
              <Route path="entry_levels" element={<CatergoryContent Categories="entry" />} />
              <Route path="careers" element={<ProductContent />} />
              <Route path="careers/:id" element={<ProductDetails table="careers" />} />
              <Route path=":route" element={< ProductLayout/>} />   {/* fixed */}
            </Route>


            {/* Cart */}
            <Route path="/cart" element={<CartPage />} />

            {/* Checkout */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmed" element={<OrderConfirmationPage />} />

          </Route>

          {/* Optional fallback */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
