import styles from './styles';

const Navbar = () =>(
  <header style={styles.header}>
    <div style={styles.logo}>SkillMarket</div>
    <nav style={styles.nav}>
      <a href="/skills" style={styles.navLink}>Skills</a>
      <a href="/careers" style={styles.navLink}>Careers</a>
      <a href="/profile" style={styles.navLink}>Profile Page</a>
      <a href="/login" style={styles.navLink}>Log In</a>
      {/* <a href="/get-started" style={styles.ctaButton} onClick={(e) => { e.preventDefault(); alert('Start your journey!'); }}>
        Get Started
      </a> */}
    </nav>
  </header>
);

export default Navbar;