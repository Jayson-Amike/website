const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    lineHeight: '1.6',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 50px',
    borderBottom: '1px solid #eee',
  },
  logo: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#007bff', // A deep blue color often used for corporate branding
  },
  nav: {
    display: 'flex',
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
    margin: '0 15px',
    fontSize: '16px',
    fontWeight: '500',
  },
  ctaButton: {
    padding: '10px 25px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  hero: {
    backgroundColor: '#f8f9fa', // Light gray background
    padding: '100px 50px',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '900',
    marginBottom: '20px',
  },
  heroSubtitle: {
    fontSize: '20px',
    color: '#555',
    marginBottom: '40px',
    maxWidth: '800px',
    margin: '0 auto 40px',
  },
  section: {
    padding: '60px 50px',
    textAlign: 'center',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '40px',
  },
  card: {
    flex: 1,
    maxWidth: '350px',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'left',
    transition: 'transform 0.3s ease',
  },
  cardTitle: {
    color: '#007bff',
    fontSize: '24px',
    marginBottom: '10px',
  },
  footer: {
    backgroundColor: '#343a40',
    color: 'white',
    padding: '40px 50px',
    textAlign: 'center',
  },
};

export default styles;