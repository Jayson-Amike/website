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
import Users from "./components/Admin/components/User";
import AdminPage from "./components/Admin/AdminPage";
import Orders from "./components/Admin/components/orders";
import Products from "./components/Admin/components/Product";
import AdminDashboard from "./components/Admin/components/AdminDashboard";

/* CUSTOMER */
import HomePage from "./components/IndexPage/HomePage";
import ProfilePage from "./components/Customer/Profile Page/profilePage.jsx";
import ProfilePage2 from "./components/Customer/Profile Page/profilePage2.jsx";
import CustomerLayout from "./components/Customer/CustomerLayout";

/* PRODUCTS */
import ProductLayout from "./components/Product/ProductLayout.jsx";
import ProductContent from "./components/Product/ProductContent.jsx";
import ProductDetails from "./components/Product/ProductDetails.jsx";

/* CART / CHECKOUT */
import CartPage from "./components/Cart/CartPage.jsx";
import CheckoutPage from "./components/Checkout/CheckoutPage";

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
          </Route>

          {/* ================= CUSTOMER ================= */}
          <Route element={<CustomerLayout />}>
            {/* Home */}
            <Route path="/" element={<HomePage />} />

            {/* Auth */}
            <Route path="/login" element={<AuthPage />} />

            {/* Profile */}
            <Route path="/profile" element={<ProfilePage2 />} />
            <Route path="/profile2" element={<ProfilePage />} />

            {/* Products */}
            <Route path="/products" element={<ProductLayout />}>
              <Route index element={<ProductContent Categories="all" />} />
              <Route
                path="career_fields"
                element={<ProductContent Categories="career" />}
              />
              <Route
                path="entry_levels"
                element={<ProductContent Categories="entry" />}
              />
              <Route
                path="careers"
                element={<ProductContent Categories="careers" />}
              />
              <Route
                path="careers/:id"
                element={<ProductDetails table="careers" />}
              />
            </Route>

            {/* Cart */}
            <Route path="/cart" element={<CartPage />} />

            {/* Checkout */}
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>

          {/* Optional fallback */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
