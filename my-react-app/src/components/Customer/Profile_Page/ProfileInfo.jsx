import React from 'react';
import { MapPin, CheckCircle } from "lucide-react";
import ProfileStats from "./ProfileStats.jsx";

const ProfileInfo = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="profile-card">
      {/* Avatar */}
      <div className="avatar-container">
        <img
          src={profile.avatar_url || "https://i.pravatar.cc/150"}
          alt="Profile"
          className="avatar-img"
        />
        <div className="verified-icon">
          <CheckCircle size={16} />
        </div>
      </div>

      <h1 className="user-name">
        {profile.username || profile.email}
      </h1>

      <p className="user-role">
        {profile.role || "Member"}
      </p>

      {profile.location && (
        <div className="user-location">
          <MapPin size={16} />
          <span>{profile.location}</span>
        </div>
      )}

      <ProfileStats userId={profile.id} />
    </div>
  );
};

export default ProfileInfo;

