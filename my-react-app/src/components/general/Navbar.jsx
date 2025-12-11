import styles from './styles';

const Navbar = () =>(
  <header style={styles.header}>
    <div style={styles.logo}>MyCredentialSite</div>
    <nav style={styles.nav}>
      <a href="/solutions" style={styles.navLink}>Solutions</a>
      <a href="/individuals" style={styles.navLink}>For Individuals</a>
      <a href="/pricing" style={styles.navLink}>Pricing</a>
      <a href="/login" style={styles.navLink}>Log In</a>
      <a href="/get-started" style={styles.ctaButton} onClick={(e) => { e.preventDefault(); alert('Start your journey!'); }}>
        Get Started
      </a>
    </nav>
  </header>
);

export default Navbar;