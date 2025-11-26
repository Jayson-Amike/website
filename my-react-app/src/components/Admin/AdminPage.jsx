import AdminDashboard from "./AdminDashboardTemplate";
import AdminNavBar from "../Navbar/AdminNavBar";
import { Outlet } from "react-router-dom";

export default function AdminPage({component}) {
  return (
    <div class="center-horizontal">
      <AdminNavBar />
     {component}
    </div>
  );
}
