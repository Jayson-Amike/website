const BadgeCard = ({ badge }) => (
  <div className="badge-card">
    <img src={badge.image} alt={badge.title} className="badge-img" />
    <h3 className="badge-title">{badge.title}</h3>
    <p className="badge-issuer">{badge.issuer}</p>
    <p className="badge-date">{badge.date}</p>
    
    <button className="verify-btn">
      Verify
    </button>
  </div>
);

export default BadgeCard;