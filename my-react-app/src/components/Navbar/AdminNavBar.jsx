import React from 'react';
// NavBar.jsx
import styles from './styles';

export default function AdminNavBar() {
  return (
    <header style={styles.header}>
  <div style={styles.logo}>MyApp</div>

  <nav style={styles.nav}>
    <a href="/admin" style={styles.navLink}>
      Sale Overiew
    </a>
    <a href="/admin/users" style={styles.navLink}>
      Users Information
    </a>
    <a href="/admin/products" style={styles.navLink}>
      Inventory
    </a>
    <a href="/" style={styles.navLink}>
      Customer View
    </a>
  </nav>
</header>

  );
}

