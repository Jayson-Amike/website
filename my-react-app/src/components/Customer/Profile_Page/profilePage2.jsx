import { useEffect, useState } from "react";
import supabase from "../../../supabaseClient.js";

import "./Profile.css";
import BadgeCard from "./BadgeCard.jsx";
import ProfileInfo from "./ProfileInfo.jsx";
import Dashboard from "./Dashboard.jsx";

const ProfilePage2 = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserAndProfile() {
      // 1️⃣ Check if user is logged in
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUser(user);

      // 2️⃣ Fetch profile data
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error) {
        setProfile(data);
      }

      setLoading(false);
    }

    getUserAndProfile();
  }, []);

  // ⏳ Loading state
  if (loading) {
    return <p>Loading profile...</p>;
  }

  // 🚫 Not logged in
  if (!user) {
    return <p>You must be logged in to view your profile.</p>;
  }

  return (
    <div>
      <div className="profile-banner"></div>

      {/* Pass real profile data */}
      <ProfileInfo profile={profile} />

      {/* <select className="filter-select">
        <option>Most Recent</option>
        <option>Most Popular</option>
      </select> */}

      <Dashboard userId={user.id} />
      {/* <BadgeCard userId={user.id} /> */}
    </div>
  );
};

export default ProfilePage2;
