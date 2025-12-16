//import AdminNavBar from "./AdminNavBar";
import { Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="center-horizontal">
      <AdminNavBar />
      <Outlet />
    </div>
  );
}
