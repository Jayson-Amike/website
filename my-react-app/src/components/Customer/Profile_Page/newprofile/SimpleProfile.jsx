import React from 'react';
import { useEffect, useState } from "react";
import supabase from "../../../../supabaseClient";
import EditProfileForm from "./EditProfileForm";
import OrderHistory from "./OrderHistory";
import "./SimpleProfile.css";

const SimpleProfile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // "profile" or "orders"

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return setUser(null);
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
      {/* Tabs */}
      <div className="profile-tabs">
        
        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Order History
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="profile-card">
          {!editing ? (
            <>
              <div className="profile-avatar">
                {profile.username?.[0]?.toUpperCase() || "U"}
              </div>

              <h2 className="profile-name">{profile.username || "Unknown"}</h2>
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
              onCancel={() => setEditing(false)}
            />
          )}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && <OrderHistory />}
    </div>
  );
};

export default SimpleProfile;

