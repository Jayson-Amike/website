import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./components/Auth/AuthPage";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/Dashboard/ProtectedRoute";
import AdminPage from "./components/Admin/AdminPage";

export default function App() {
  return (
    <AdminPage />
  );
}
