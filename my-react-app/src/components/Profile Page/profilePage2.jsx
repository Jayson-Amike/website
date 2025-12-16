import React from 'react';
import { MapPin, Share2, Award, CheckCircle } from 'lucide-react';
import './Profile.css'; // Make sure to import the CSS file here!
import Navbar from '../IndexPage/NavBar.jsx';
import BadgeCard from './BadgeCard.jsx';
import ProfileInfo from './ProfileInfo.jsx';
import Dashboard from './Dashboard.jsx';
// --- Mock Data ---




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
      <BadgeCard/>
      
    </div>
  );
};

export default ProfilePage2;