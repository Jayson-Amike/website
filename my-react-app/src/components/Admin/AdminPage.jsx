import React from 'react';
import { Outlet } from "react-router-dom";
import AdminNavBar from "../Navbar/AdminNavBar";

export default function AdminPage() {
  return (
    <div className="admin-layout">
      <AdminNavBar /> {/* This stays fixed */}
      
      <div className="content-area">
        <Outlet />  {/* This is the "reserved seat" for Orders, Users, etc. */}
      </div>
    </div>
  );
}
