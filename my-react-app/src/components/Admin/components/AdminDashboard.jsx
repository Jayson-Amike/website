import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import supabase from "../../../supabaseClient";

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // newest or oldest

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Stats
        const { data: totalSalesData } = await supabase
          .from("orders")
          .select("total")
          .eq("status", "confirmed");
        const totalSales =
          totalSalesData?.reduce((sum, o) => sum + Number(o.total), 0) || 0;

        const { count: newUsersCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact" })
          .gte(
            "created_at",
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          );

        const { count: pendingOrdersCount } = await supabase
          .from("orders")
          .select("*", { count: "exact" })
          .ilike("status", "pending");

        const { count: totalProducts } = await supabase
          .from("products")
          .select("*", { count: "exact" });

        setStats([
          { label: "Total Sales", value: `$${totalSales.toFixed(2)}`, color: "#4caf50" },
          { label: "New Users (30d)", value: newUsersCount || 0, color: "#2196f3" },
          { label: "Pending Orders", value: pendingOrdersCount || 0, color: "#ff9800" },
          { label: "Products", value: totalProducts || 0, color: "#f44336" },
        ]);

        // Recent orders
        const { data: recentOrders } = await supabase
          .from("orders")
          .select("id, total, status, created_at, user_id")
          .order("created_at", { ascending: false })
          .limit(50);

        setOrders(recentOrders || []);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  // Filtered & sorted orders
  const filteredOrders = useMemo(() => {
    let filtered = orders.filter((order) => {
      return (
        search === "" ||
        order.user_id.toString().includes(search) ||
        order.id.toString().includes(search)
      );
    });

    filtered.sort((a, b) =>
      sortOrder === "oldest"
        ? new Date(a.created_at) - new Date(b.created_at)
        : new Date(b.created_at) - new Date(a.created_at)
    );

    return filtered;
  }, [orders, search, sortOrder]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div style={pageStyle}>
      <h2>Admin Overview</h2>

      {/* Stats */}
      <div style={statsGrid}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{ ...statCard, borderLeft: `5px solid ${stat.color}` }}>
            <p style={statLabel}>{stat.label}</p>
            <h3 style={statValue}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div style={cardStyle}>
        <h3>Recent Transactions</h3>

        {/* Filters */}
        <div style={filterBar}>
          <input
            type="text"
            placeholder="Search by Order ID or User ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={filterInput}
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={filterSelect}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <p>No matching orders.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <th style={th}>Order ID</th>
                <th style={th}>User</th>
                <th style={th}>Status</th>
                <th style={th}>Amount</th>
                <th style={th}>Created</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td style={td}>#{order.id}</td>
                  <td style={td}>
                    <Link
                      to={`/admin/users/${order.user_id}`}
                      style={{ color: "#2196f3", textDecoration: "underline" }}
                    >
                      {order.user_id}
                    </Link>
                  </td>
                  <td
                    style={{
                      ...td,
                      color:
                        order.status === "confirmed"
                          ? "green"
                          : order.status === "pending"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {order.status}
                  </td>
                  <td style={td}>${Number(order.total).toFixed(2)}</td>
                  <td style={td}>{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

/* ===================== STYLES ===================== */
const pageStyle = { padding: "20px", backgroundColor: "#f4f7f6", minHeight: "100vh" };
const statsGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px" };
const statCard = { backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" };
const statLabel = { margin: 0, color: "#666", fontSize: "14px" };
const statValue = { margin: "10px 0 0", fontSize: "24px" };
const cardStyle = { backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" };
const tableStyle = { width: "100%", borderCollapse: "collapse", textAlign: "left" };
const th = { padding: "12px", fontSize: "13px", color: "#666" };
const td = { padding: "12px" };
const filterBar = { display: "flex", gap: "12px", marginBottom: "16px", alignItems: "center" };
const filterInput = { padding: "8px 10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px" };
const filterSelect = { padding: "8px 10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px" };

export default AdminDashboard;
