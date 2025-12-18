// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthContext"; // correct path
import Navbar from "./components/Navbar/NavBar";
import AuthPage from "./components/Auth/AuthPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Users from "./components/Admin/components/User";
import AdminPage from "./components/Admin/AdminPage";
import Orders from "./components/Admin/components/orders";
import Products from "./components/Admin/components/Product";
import HomePage from "./components/IndexPage/HomePage";
import ProfilePage from "./components/Customer/Profile Page/profilePage.jsx";
import ProfilePage2 from "./components/Customer/Profile Page/profilePage2.jsx";
import AdminDashboard from "./components/Admin/components/AdminDashboard";
import CustomerLayout from "./components/Customer/CustomerLayout";
import ProductLayout from "./components/Product/ProductLayout.jsx";
import ProductContent from "./components/Product/ProductContent.jsx";
import ProductDetails from "./components/Product/ProductDetails.jsx";
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin */}
       <Route path="/admin" element={<AdminPage />}>
          {/* These components will "fill" the Outlet when the URL matches */}
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
        </Route>

                {/* CUSTOMER SECTION */}
          <Route element={<CustomerLayout />}>
            {/* Home */}
            <Route path="/" element={<HomePage />} />


            {/* Auth */}
            < Route path="/login" element={<AuthPage />} />
          
            {/* Profile */}
            <Route path="/profile2" element={<ProfilePage />} />
            <Route path="/profile" element={<ProfilePage2 />} />

            {/* Products section  */}
            <Route path="/products" element={<ProductLayout />}>
              {/* The Parent (Layout) stays clean. The Children get the props. */}
              <Route index element={<ProductContent Categories="all" />} />
              <Route path="career_fields" element={<ProductContent Categories="career" />} />
              <Route path="entry_levels" element={<ProductContent Categories="entry" />} />
              <Route path="everything" element={<ProductContent Categories="everything" />} />
                <Route path=":table/:id" element={<ProductDetails />} />

            </Route>
          </Route>

        

       
        {/* Catch-all */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </AuthProvider>
  );
}
