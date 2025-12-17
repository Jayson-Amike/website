import { MapPin, Share2, Award, CheckCircle } from 'lucide-react';
import ProfileStats from './ProfileStats.jsx';
const userData = {
  name: "Jane Developer",
  role: "Senior Frontend Engineer",
  location: "San Francisco, CA, USA",
  bio: "Passionate about building accessible web applications and teaching React.",
  avatar: "https://i.pravatar.cc/150?img=32"
};


const ProfileInfo = () => {
  return (
    <div className="profile-card">
            {/* Avatar */}
            <div className="avatar-container">
              <img src={userData.avatar} alt="Profile" className="avatar-img" />
              <div className="verified-icon">
                  <CheckCircle size={16} />
              </div>
          </div>
           <h1 className="user-name">{userData.name}</h1>
              <p className="user-role">{userData.role}</p>

              <div className="user-location">
                    <MapPin size={16} />
                    <span>{userData.location}</span>
                </div>

               <ProfileStats />
            </div>
    );
}

export default ProfileInfo;