import styles from "./styles";

const FeaturesSection = () => (
  <section style={{ ...styles.section, backgroundColor: '#f0f0f0' }}>
    <h2>Why Choose Our Platform?</h2>
    <div style={styles.cardContainer}>
      {/* Feature 1 */}
      <div style={{ ...styles.card, backgroundColor: '#eef' }}>
        <h4 style={styles.cardTitle}>Secure Verification</h4>
        <p>Credentials are cryptographically secured and instantly verifiable against the issuer's record.</p>
      </div>
      {/* Feature 2 */}
      <div style={{ ...styles.card, backgroundColor: '#eef' }}>
        <h4 style={styles.cardTitle}>Global Reach</h4>
        <p>Integrate with top platforms like LinkedIn and Twitter to share credentials with a single click.</p>
      </div>
      {/* Feature 3 */}
      <div style={{ ...styles.card, backgroundColor: '#eef' }}>
        <h4 style={styles.cardTitle}>Detailed Insights</h4>
        <p>Access analytics on how credentials are being shared, accepted, and valued in the job market.</p>
      </div>
    </div>
  </section>
);

export default FeaturesSection;