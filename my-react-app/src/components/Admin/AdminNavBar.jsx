// AdminNavBar.jsx
import { Link } from "react-router-dom";
import "../Navbar/NavBar.css";

export default function AdminNavBar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Admin</h1>
      <ul className="nav-links">
        <li><Link to="/admin/orders">Sales</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/products">Inventory</Link></li>
      </ul>
    </nav>
  );
}
