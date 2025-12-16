
const Numbadges= 5;
const ProfileStats = () => {
  return (
  <div className="profile-stats">
                 <div className="stat-item">
                    <span className="stat-value">{Numbadges}</span>
                    <span>Badges</span>
                 </div>
                 <div className="stat-item">
                    <span className="stat-value">12</span>
                    <span>Skills</span>
                 </div>
              </div>
            
  );
}
export default ProfileStats;