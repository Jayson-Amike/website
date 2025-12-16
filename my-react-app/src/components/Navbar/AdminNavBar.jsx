// NavBar.jsx
import React from "react";
import "./NavBar.css"; // optional for styling

export default function AdminNavBar() {
  return (
    <header style={styles.header}>
  <div style={styles.logo}>MyApp</div>

  <nav style={styles.nav}>
    <a href="/admin/orders" style={styles.navLink}>
      Sale Information
    </a>
    <a href="/admin/users" style={styles.navLink}>
      Users Information
    </a>
    <a href="/admin/products" style={styles.navLink}>
      Inventory
    </a>
  </nav>
</header>

  );
}
