import styles from "./styles";

const UserTypeSection = () => (
  <section style={styles.section}>
    <h2>Who We Serve</h2>
    <div style={styles.cardContainer}>
      {/* Card for Organizations */}
      <div style={{ ...styles.card, backgroundColor: '#ffffff' }}>
        <h3 style={styles.cardTitle}>For Student </h3>
        <p>
          Not sure where your skills can take you? Explore career paths, skills  , and discover opportunities tailored to your verified achievements.
        </p>
      </div>

      {/* Card for Individuals */}
      <div style={{ ...styles.card, backgroundColor: '#ffffff' }}>
        <h3 style={styles.cardTitle}>For Individuals</h3>
        <p>
          Collect, manage, and share your verified skills and achievements across social media and professional networks to open new career doors.
        </p>
      </div>
    </div>
  </section>
);

export default UserTypeSection;