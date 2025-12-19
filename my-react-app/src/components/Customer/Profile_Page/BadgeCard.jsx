const badges = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "Issued Dec 2025",
    image: "https://via.placeholder.com/150/FF9900/FFFFFF?text=AWS",
  },
  {
    id: 2,
    title: "Professional Scrum Master I",
    issuer: "Scrum.org",
    date: "Issued Nov 2025",
    image: "https://via.placeholder.com/150/333333/FFFFFF?text=PSM+I",
  },
  {
    id: 3,
    title: "React Developer Level 2",
    issuer: "Meta",
    date: "Issued Oct 2025",
    image: "https://via.placeholder.com/150/61DAFB/000000?text=React",
  },
  {
    id: 4,
    title: "Cybersecurity Fundamentals",
    issuer: "IBM",
    date: "Issued Sep 2025",
    image: "https://via.placeholder.com/150/006699/FFFFFF?text=IBM+Sec",
  },
  {
    id: 5,
    title: "Python Data Science",
    issuer: "Google",
    date: "Issued Aug 2025",
    image: "https://via.placeholder.com/150/306998/FFFFFF?text=Python",
  }
];

const BadgeCard = () => (
  badges.map((badge) => (
    <div className="badge-card" key={badge.id}>
      <img src={badge.image} alt={badge.title} className="badge-img" />
      <h3 className="badge-title">{badge.title}</h3>
      <p className="badge-issuer">{badge.issuer}</p>
      <p className="badge-date">{badge.date}</p>
      <button className="verify-btn">Verify</button>
    </div>
  ))
);


export default BadgeCard;