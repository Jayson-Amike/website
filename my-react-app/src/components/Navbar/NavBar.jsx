import { useAuth } from "../Auth/AuthContext";
import supabase from "../../supabaseClient";
import styles from "./styles";

const Navbar = () => {
  const { session, setSession } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>SkillMarket</div>
      <nav style={styles.nav}>
        <a href="/skills" style={styles.navLink}>Skills</a>
        <a href="/careers" style={styles.navLink}>Careers</a>
        <a href="/profile" style={styles.navLink}>Profile Page</a>
        {session ? (
          <span onClick={handleLogout} style={{ ...styles.navLink, cursor: "pointer" }}>Log Out</span>
        ) : (
          <a href="/login" style={styles.navLink}>Log In</a>
        )}
              {/* need to hide or remove components to detect admin or not  */}

        <a href="/admin" style={styles.navLink}>adnim Page</a>

      </nav>

    </header>
  );
};

export default Navbar;
