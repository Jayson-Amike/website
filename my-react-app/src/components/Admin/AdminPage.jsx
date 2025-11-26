import AdminDashboard from "./AdminDashboardTemplate";
import AdminNavBar from "../Navbar/AdminNavBar";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div>
      <AdminNavBar />
      <AdminDashboard
        title="User Table"
        description="List of all users"
      />
      <Outlet /> {/* Nested routes (like Orders) will render here */}
    </div>
  );
}
