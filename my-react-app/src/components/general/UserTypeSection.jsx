import styles from "./styles";

const UserTypeSection = () => (
  <section style={styles.section}>
    <h2>Who We Serve</h2>
    <div style={styles.cardContainer}>
      {/* Card for Organizations */}
      <div style={{ ...styles.card, backgroundColor: '#ffffff' }}>
        <h3 style={styles.cardTitle}>For Organizations</h3>
        <p>
          Issue secure, verifiable credentials to increase brand loyalty, drive program enrollment, and measure skill development outcomes.
        </p>
        <p><a href="/organizations" style={{ color: '#007bff', fontWeight: 'bold' }}>Learn More &rarr;</a></p>
      </div>

      {/* Card for Individuals */}
      <div style={{ ...styles.card, backgroundColor: '#ffffff' }}>
        <h3 style={styles.cardTitle}>For Individuals</h3>
        <p>
          Collect, manage, and share your verified skills and achievements across social media and professional networks to open new career doors.
        </p>
        <p><a href="/individuals" style={{ color: '#007bff', fontWeight: 'bold' }}>Find Out How &rarr;</a></p>
      </div>
    </div>
  </section>
);