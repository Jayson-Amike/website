// NavBar.jsx
import React from "react";
import "./NavBar.css"; // optional for styling

export default function AdminNavBar() {
  return (
    <nav className="navbar">
      <h1 className="logo">MyApp</h1>
      <ul className="nav-links">
        <li><a href="/admin/orders">Sale Information</a></li>
        <li><a href="/admin/users">Users Information</a></li>
        <li><a href="/admin/products">Inventory</a></li>
      </ul>
    </nav>
  );
}
