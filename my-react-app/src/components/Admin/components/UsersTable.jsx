import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import supabase from "../../../supabaseClient";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // Editing state per user
  const [editingUserId, setEditingUserId] = useState(null);
  const [editValues, setEditValues] = useState({ username: "", email: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setUsers(data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const startEdit = (user) => {
    setEditingUserId(user.id);
    setEditValues({ username: user.username || "", email: user.email || "" });
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditValues({ username: "", email: "" });
  };

  const saveEdit = async (userId) => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from("profiles")
        .update({ username: editValues.username, email: editValues.email })
        .eq("id", userId);
      if (error) throw error;

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, ...editValues } : u))
      );
      setEditingUserId(null);
    } catch (err) {
      console.error("Error updating user:", err);
    } finally {
      setSaving(false);
    }
  };

  // Filtered + sorted users
  const filteredUsers = useMemo(() => {
    let filtered = users.filter((user) => {
      const matchesSearch =
        user.username?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });

    filtered.sort((a, b) =>
      sortOrder === "oldest"
        ? new Date(a.created_at) - new Date(b.created_at)
        : new Date(b.created_at) - new Date(a.created_at)
    );

    return filtered;
  }, [users, search, roleFilter, sortOrder]);

  if (loading) return <p>Loading users...</p>;

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <h2>Users</h2>

      <div style={cardStyle}>
        {/* Filters */}
        <div style={filterBar}>
          <input
            type="text"
            placeholder="Search username or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={filterInput}
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={filterSelect}
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={filterSelect}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Table */}
        {filteredUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <th style={th}>User ID</th>
                <th style={th}>Username</th>
                <th style={th}>Email</th>
                <th style={th}>Bio</th>
                <th style={th}>Role</th>
                <th style={th}>Created</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={td}>
                    <Link
                      to={`/admin/users/${user.id}`}
                      style={{ color: "#2196f3", textDecoration: "underline" }}
                    >
                      {user.id}
                    </Link>
                  </td>

                  <td style={td}>
                    {editingUserId === user.id ? (
                      <input
                        value={editValues.username}
                        onChange={(e) =>
                          setEditValues({ ...editValues, username: e.target.value })
                        }
                        style={inputStyle}
                      />
                    ) : (
                      user.username || "—"
                    )}
                  </td>

                  <td style={td}>
                    {editingUserId === user.id ? (
                      <input
                        value={editValues.email}
                        onChange={(e) =>
                          setEditValues({ ...editValues, email: e.target.value })
                        }
                        style={inputStyle}
                      />
                    ) : (
                      user.email || "—"
                    )}
                  </td>

                  <td style={{ ...td, maxWidth: "280px", color: "#555" }}>{user.bio || "—"}</td>

                  <td style={td}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        backgroundColor: user.role === "admin" ? "#e3f2fd" : "#f1f1f1",
                        color: user.role === "admin" ? "#1976d2" : "#555",
                        fontSize: "12px",
                        fontWeight: 500,
                      }}
                    >
                      {user.role || "user"}
                    </span>
                  </td>

                  <td style={td}>{new Date(user.created_at).toLocaleDateString()}</td>

                  <td style={td}>
                    {editingUserId === user.id ? (
                      <>
                        <button
                          style={saveBtn}
                          onClick={() => saveEdit(user.id)}
                          disabled={saving}
                        >
                          {saving ? "Saving..." : "Save"}
                        </button>
                        <button style={cancelBtn} onClick={cancelEdit}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button style={editBtn} onClick={() => startEdit(user)}>
                        Edit
                      </button>
                    )}
                  </td>
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
const cardStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};
const tableStyle = { width: "100%", borderCollapse: "collapse", textAlign: "left" };
const th = { padding: "12px", fontSize: "13px", color: "#666", fontWeight: 600 };
const td = { padding: "12px", fontSize: "14px", verticalAlign: "top" };
const filterBar = { display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center" };
const filterInput = { padding: "6px 10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px", width: "200px" };
const filterSelect = { padding: "6px 10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px" };

const inputStyle = { padding: "4px 8px", borderRadius: "4px", border: "1px solid #ccc", width: "150px" };
const btnBase = { padding: "4px 8px", borderRadius: "4px", border: "none", cursor: "pointer", marginRight: "5px" };
const editBtn = { ...btnBase, backgroundColor: "#2196f3", color: "#fff" };
const saveBtn = { ...btnBase, backgroundColor: "#4caf50", color: "#fff" };
const cancelBtn = { ...btnBase, backgroundColor: "#e0e0e0", color: "#333" };

export default UsersTable;
