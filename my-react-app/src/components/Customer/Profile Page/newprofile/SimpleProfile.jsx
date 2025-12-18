import { useEffect, useState } from "react";
import supabase from "../../../../supabaseClient";
import EditProfileForm from "./EditProfileForm";
import "./SimpleProfile.css";

const SimpleProfile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUser(user);

      const { data } = await supabase
        .from("profiles")
        .select("username, email, bio")
        .eq("email", user.email)
        .single();

      setProfile(data);
    }

    loadProfile();
  }, []);

  if (!user) return <p className="profile-status">Please log in.</p>;
  if (!profile) return <p className="profile-status">Loading...</p>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        {!editing ? (
          <>
            <div className="profile-avatar">
              {profile.username?.[0]?.toUpperCase() || "U"}
            </div>

            <h2 className="profile-name">{profile.username}</h2>
            <p className="profile-email">{profile.email}</p>

            <div className="profile-divider" />
            <p className="profile-bio">{profile.bio || "No bio yet."}</p>

            <button
              className="edit-btn"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <EditProfileForm
            profile={profile}
            onSave={(updated) => {
              setProfile(updated);
              setEditing(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SimpleProfile;
