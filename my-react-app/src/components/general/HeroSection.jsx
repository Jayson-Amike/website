import styles from './styles';


const HeroSection = () => (
  <section style={styles.hero}>
    <h1 style={styles.heroTitle}>The World’s Largest Network of Verified Credentials</h1>
    <p style={styles.heroSubtitle}>
      Give your achievements the recognition they deserve. Issue, manage, and share digital badges and certifications with confidence.
    </p>
    <a href="/demo" style={{ ...styles.ctaButton, padding: '15px 35px', fontSize: '18px' }} onClick={(e) => { e.preventDefault(); alert('Requesting a demo...'); }}>
      Request a Demo
    </a>
  </section>
);