// Navbar.jsx
import { Link } from "react-router-dom";
import AdminNavBar from "../Admin/AdminNavBar";
import styles from './styles'; // your existing styles

export default function Navbar({ userRole }) {
  // If admin, show AdminNavBar
  if (userRole === "admin") return <AdminNavBar />;

  // Regular navbar for everyone else
  return (
    <header style={styles.header}>
      <div style={styles.logo}>SkillMarket</div>
      <nav style={styles.nav}>
        <Link to="/solutions" style={styles.navLink}>Solutions</Link>
        <Link to="/individuals" style={styles.navLink}>For Individuals</Link>
        <Link to="/pricing" style={styles.navLink}>Pricing</Link>
        <Link to="/login" style={styles.navLink}>Log In</Link>
        <Link
          to="/get-started"
          style={styles.ctaButton}
          onClick={(e) => { e.preventDefault(); alert('Start your journey!'); }}
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
}
