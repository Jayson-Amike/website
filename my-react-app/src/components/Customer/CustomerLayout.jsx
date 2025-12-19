import React from 'react';
import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/NavBar";

export default function CustomerLayout() {
  return (
    <div className="customer-layout">
      <NavBar /> {/* This stays fixed */}
      
      <div className="content-area">
        <Outlet />  {/* This is the "reserved seat" for Orders, Users, etc. */}
      </div>
    </div>
  );
}


