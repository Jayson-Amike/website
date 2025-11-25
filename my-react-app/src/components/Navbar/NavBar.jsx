// NavBar.jsx
import React from "react";
import "./NavBar.css"; // optional for styling

export default function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="logo">MyApp</h1>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#users">Users</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
  );
}
