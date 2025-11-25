// NavBar.jsx
import React from "react";
import "./NavBar.css"; // optional for styling

export default function AdminNavBar() {
  return (
    <nav className="navbar">
      <h1 className="logo">MyApp</h1>
      <ul className="nav-links">
        <li><a href="#home">Sale Information</a></li>
        <li><a href="#users">Users Information</a></li>
        <li><a href="#about">Inventory</a></li>
      </ul>
    </nav>
  );
}
