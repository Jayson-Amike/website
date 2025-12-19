import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../../supabaseClient";

const UserDashboard = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit state
  const [editing, setEditing] = useState(false);
  const [editValues, setEditValues] = useState({ username: "", email: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);

        // Fetch user profile
        const { data: userData, error: userError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();
        if (userError) throw userError;
        setUser(userData);

        // Prefill edit values
        setEditValues({
          username: userData.username || "",
          email: userData.email || "",
        });

        // Fetch user orders
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("id, total, status, created_at")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });
        if (ordersError) throw ordersError;
        setOrders(ordersData || []);
      } catch (error) {
        console.error("Error fetching user dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [userId]);

  const startEdit = () => setEditing(true);

  const cancelEdit = () => {
    setEditValues({ username: user.username || "", email: user.email || "" });
    setEditing(false);
  };

  const saveEdit = async () => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from("profiles")
        .update({ username: editValues.username, email: editValues.email })
        .eq("id", userId);

      if (error) throw error;
      setUser((prev) => ({ ...prev, ...editValues }));
      setEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading user dashboard...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div style={pageStyle}>
      <h2>User Dashboard</h2>

      {/* User Info */}
      <div style={cardStyle}>
        <h3>Profile Info</h3>

        <p><strong>User ID:</strong> {user.id}</p>

        <p>
          <strong>Username:</strong>{" "}
          {editing ? (
            <input
              value={editValues.username}
              onChange={(e) =>
                setEditValues({ ...editValues, username: e.target.value })
              }
              style={inputStyle}
            />
          ) : (
            user.username || "Unknown"
          )}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {editing ? (
            <input
              value={editValues.email}
              onChange={(e) =>
                setEditValues({ ...editValues, email: e.target.value })
              }
              style={inputStyle}
            />
          ) : (
            user.email || "Unknown"
          )}
        </p>

        <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>

        {editing ? (
          <div style={{ marginTop: "10px" }}>
            <button style={saveBtn} onClick={saveEdit} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
            <button style={cancelBtn} onClick={cancelEdit}>Cancel</button>
          </div>
        ) : (
          <button style={editBtn} onClick={startEdit}>Edit Profile</button>
        )}
      </div>

      {/* User Orders */}
      <div style={cardStyle}>
        <h3>Recent Orders</h3>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={th}>Order ID</th>
                <th style={th}>Status</th>
                <th style={th}>Amount</th>
                <th style={th}>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td style={td}>#{order.id}</td>
                  <td style={{ ...td, color: order.status === "confirmed" ? "green" : order.status === "pending" ? "orange" : "red" }}>
                    {order.status || "Unknown"}
                  </td>
                  <td style={td}>${Number(order.total).toFixed(2)}</td>
                  <td style={td}>{new Date(order.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

/* ======= STYLES ======= */
const pageStyle = { padding: "20px", backgroundColor: "#f4f7f6", minHeight: "100vh" };
const cardStyle = { backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", marginBottom: "30px" };
const inputStyle = { padding: "6px 10px", borderRadius: "4px", border: "1px solid #ccc", width: "250px" };
const btnBase = { padding: "6px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: 500 };
const editBtn = { ...btnBase, backgroundColor: "#2196f3", color: "#fff" };
const saveBtn = { ...btnBase, backgroundColor: "#4caf50", color: "#fff", marginRight: "10px" };
const cancelBtn = { ...btnBase, backgroundColor: "#e0e0e0", color: "#333" };
const tableStyle = { width: "100%", borderCollapse: "collapse", textAlign: "left" };
const th = { padding: "12px", fontSize: "13px", color: "#666" };
const td = { padding: "12px" };

export default UserDashboard;
