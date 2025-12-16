import { Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "./components/Auth/AuthPage";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/Dashboard/ProtectedRoute";
import Users from "./components/Admin/components/User";
import AdminPage from "./components/Admin/AdminPage";
import Orders from "./components/Admin/components/orders";
import Products from "./components/Admin/components/Product";
import HomePage from "./components/IndexPage/HomePage";
import ProfilePage from "./components/Profile Page/profilePage.jsx";
import ProfilePage2 from "./components/Profile Page/profilePage2.jsx";
export default function App() {
  return (
     <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<AuthPage />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminPage />} />

      <Route path="/admin/orders" element={<AdminPage component={<Orders />} />} />

      <Route path="/admin/users" element={<AdminPage component={<Users />} />} />

      <Route path="/admin/products" element={<AdminPage component={<Products />} />} />

      <Route path="/profile2" element={<ProfilePage />} />

      <Route path="/profile" element={<ProfilePage2 />} />

      {/* Redirect root path to /admin */}
      {/* <Route path="/" element={<Navigate to="/IndexPage" replace />} /> */}
      <Route path="/" element={<HomePage />} />

      
      {/* Catch-all for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
