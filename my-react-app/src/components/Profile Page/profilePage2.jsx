import React from 'react';
import { MapPin, Share2, Award, CheckCircle } from 'lucide-react';
import './Profile.css'; // Make sure to import the CSS file here!
import Navbar from '../IndexPage/NavBar.jsx';
import BadgeCard from './BadgeCard.jsx';
import ProfileInfo from './ProfileInfo.jsx';
import Dashboard from './Dashboard.jsx';
// --- Mock Data ---

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



// --- Main Component ---

const ProfilePage2 = () => {
  return (
    <div>
      <Navbar />

      <div className="profile-banner"></div>

       <ProfileInfo />
       <select className="filter-select">
                  <option>Most Recent</option>
                  <option>Most Popular</option>
        </select>

      <Dashboard />
 
    </div>
  );
};

export default ProfilePage2;