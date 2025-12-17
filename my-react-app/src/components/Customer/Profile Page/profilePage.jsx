import React from 'react';
import { MapPin, Share2, Award, CheckCircle } from 'lucide-react';
import './Profile.css'; // Make sure to import the CSS file here!
// --- Mock Data ---
const userData = {
  name: "Jane Developer",
  role: "Senior Frontend Engineer",
  location: "San Francisco, CA, USA",
  bio: "Passionate about building accessible web applications and teaching React.",
  avatar: "https://i.pravatar.cc/150?img=32"
};

export const badges = [
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

// --- Sub-Components ---



export const BadgeCard = ({ badge }) => (
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

const Sidebar = () => (
  <div className="sidebar-wrapper">
    {/* About Section */}
    <div className="sidebar-section">
      <h3 className="sidebar-title">About</h3>
      <p className="sidebar-text">{userData.bio}</p>
    </div>

    {/* Skills Section */}
    <div className="sidebar-section">
      <h3 className="sidebar-title">Skills</h3>
      <div className="skills-container">
        {['React', 'JavaScript', 'AWS', 'Agile', 'CSS'].map((skill) => (
          <span key={skill} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// --- Main Component ---

const ProfilePage = () => {
  return (
    <div className="app-container">
      
      {/* Banner Area */}
      <div className="profile-banner"></div>

      <div className="main-container">
        <div className="profile-grid">
          
          {/* Left Column: Profile Info */}
          <div className="profile-sidebar-col">
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

              <button className="share-btn">
                <Share2 size={16} /> Share Profile
              </button>

              <div className="profile-stats">
                 <div className="stat-item">
                    <span className="stat-value">{badges.length}</span>
                    <span>Badges</span>
                 </div>
                 <div className="stat-item">
                    <span className="stat-value">12</span>
                    <span>Skills</span>
                 </div>
              </div>
            </div>
            
            {/* Mobile Sidebar (Visible if grid stacks) */}
            <div className="mobile-only-sidebar" style={{ marginTop: '1.5rem' }}>
               {/* Note: In pure CSS grid, we usually handle visibility via media queries. 
                   For simplicity here, the sidebar is rendered below in the desktop layout. 
                   If you want it here on mobile, you can leave this. */}
            </div>
          </div>

          {/* Right Column: Badges Dashboard */}
          <div className="dashboard-col">
            
            {/* Dashboard Header */}
          

            {/* Badges Grid */}
            <div className="badges-grid">
              {badges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>

            {/* Desktop Sidebar Content */}
             <div className="desktop-sidebar-content" style={{ marginTop: '2rem' }}>
                 <div className="sidebar-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <Sidebar />
                 </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;