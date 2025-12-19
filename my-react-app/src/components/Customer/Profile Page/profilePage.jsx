import React, { useEffect, useState } from 'react';
import { MapPin, Share2, Award, CheckCircle } from 'lucide-react';
import './Profile.css';
// import Navbar from '../IndexPage/NavBar.jsx';
import supabase from '../../../supabaseClient'; //

const ProfilePage = () => {
  // 1. Initialize states for database data
  const [userProfile, setUserProfile] = useState(null);
  const [userBadges, setUserBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfileData() {
      try {
        // 2. Get the currently logged-in user session
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // 3. Fetch user details from a 'profiles' or 'users' table
          const { data: profileData, error: profileError } = await supabase
            .from('profiles') // Adjust table name to match your DB
            .select('*')
            .eq('id', user.id)
            .single();

          if (profileData) setUserProfile(profileData);

          // 4. Fetch badges associated with this user
          const { data: badgesData, error: badgesError } = await supabase
            .from('badges') // Adjust table name to match your DB
            .select('*')
            .eq('user_id', user.id);

          if (badgesData) setUserBadges(badgesData);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }

    getProfileData();
  }, []);

  if (loading) return <div className="loading">Loading Profile...</div>;
  if (!userProfile) return <div className="error">Please log in to view your profile.</div>;

  return (
    <div className="profile-container">
      <Navbar />
      
      <div className="profile-header">
        <img 
          src={userProfile.avatar_url || "https://via.placeholder.com/150"} 
          className="avatar-img" 
          alt="Avatar" 
        />
        <h1>{userProfile.full_name || userProfile.name}</h1>
        <p className="role">{userProfile.role}</p>
        <div className="location">
          <MapPin size={16} /> {userProfile.location}
        </div>
      </div>

      <div className="badges-grid">
        {userBadges.length > 0 ? (
          userBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))
        ) : (
          <p>No badges earned yet.</p>
        )}
      </div>
    </div>
  );
};

// Updated BadgeCard to use database fields
export const BadgeCard = ({ badge }) => (
  <div className="badge-card">
    <img src={badge.image_url} alt={badge.title} className="badge-img" />
    <h3 className="badge-title">{badge.title}</h3>
    <p className="badge-issuer">{badge.issuer}</p>
    <p className="badge-date">{new Date(badge.created_at).toLocaleDateString()}</p>
    <button className="verify-btn">Verify</button>
  </div>
);

export default ProfilePage;