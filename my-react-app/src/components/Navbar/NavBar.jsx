import { useAuth } from "../Auth/AuthContext";
import { useCart } from "../Cart/CartContext"; // <-- import cart context
import supabase from "../../supabaseClient";
import styles from "./styles";

const Navbar = () => {
  const { session, setSession } = useAuth();
  const { cart } = useCart(); // <-- get cart items

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <header style={styles.header}>
      <a href="/" style={styles.navLink}>
        <div style={styles.logo}>SkillMarket</div>
      </a>

      <nav style={styles.nav}>
        <a href="/products/careers" style={styles.navLink}>Careers</a>
        <a href="/products/career_fields" style={styles.navLink}>Career Fields</a>
        <a href="/products/entry_levels" style={styles.navLink}>Entry Levels</a>
        <a href="/profile" style={styles.navLink}>Profile</a>

        {/* Cart Link with item count */}
        <a href="/cart" style={styles.navLink}>
          Cart ({cart.length})
        </a>

        {session ? (
          <span onClick={handleLogout} style={{ ...styles.navLink, cursor: "pointer" }}>
            Log Out
          </span>
        ) : (
          <a href="/login" style={styles.navLink}>Log In</a>
        )}

        {/* Admin links */}
        <a href="/products" style={styles.navLink}>Products</a>
        <a href="/admin" style={styles.navLink}>Admin Page</a>
      </nav>
    </header>
  );
};

export default Navbar;
