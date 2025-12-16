import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import supabase from "./supabaseClient";

import Navbar from "./components/general/Navbar";
import AdminNavBar from "./components/Admin/AdminNavBar";

import AuthPage from "./components/Auth/AuthPage";
import Dashboard from "./components/Dashboard/Dashboard";

import AdminPage from "./components/Admin/AdminPage";
import AdminPanel from "./components/Admin/AdminPanel";
import Orders from "./components/Admin/components/orders";
import Users from "./components/Admin/components/User";
import Products from "./components/Admin/components/Product";
import HomePage from "./components/IndexPage/HomePage";

export default function App() {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) fetchUserRole(data.session.user.id);
      else setLoading(false);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchUserRole(session.user.id);
      else setUserRole(null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching role:", error);
        setUserRole("user");
      } else {
        setUserRole(data.role || "user");
      }
    } catch (err) {
      console.error("Error fetching role:", err);
      setUserRole("user");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      {/* Navbar changes based on role */}
      {userRole === "admin" ? <AdminNavBar /> : <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<AuthPage />} />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminPage />} />

      <Route path="/admin/orders" element={<AdminPage component={<Orders />} />} />

      <Route path="/admin/users" element={<AdminPage component={<Users />} />} />

      <Route path="/admin/products" element={<AdminPage component={<Products />} />} />

      {/* Redirect root path to /admin */}
      {/* <Route path="/" element={<Navigate to="/IndexPage" replace />} /> */}
      <Route path="/" element={<HomePage />} />

      
      {/* Catch-all for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
