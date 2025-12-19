import styles from "./styles";

const FeaturesSection = () => (
  <section style={{ ...styles.section, backgroundColor: '#f0f0f0' }}>
    <h2>Why Choose Our Platform?</h2>
    <div style={styles.cardContainer}>
      {/* Feature 1 */}
      <div style={{ ...styles.card, backgroundColor: '#eef' }}>
        <h4 style={styles.cardTitle}>Invest in Yourself</h4>
        <p>Credentials are the Biggest Openers in Professional Success.</p>
      </div>
      {/* Feature 2 */}
      <div style={{ ...styles.card, backgroundColor: '#eef' }}>
        <h4 style={styles.cardTitle}>Be Different</h4>
        <p>Show Initiative and Stand Out amongst the Crowd.</p>
      </div>
     
    </div>
  </section>
);

export default FeaturesSection;