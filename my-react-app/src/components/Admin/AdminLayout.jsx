import AdminNavBar from "./AdminNavBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      <AdminNavBar />
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}