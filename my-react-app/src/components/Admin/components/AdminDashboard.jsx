import React, { useEffect, useState } from "react";
import supabase from "../../../supabaseClient";

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // 1️⃣ Total Sales (sum of completed orders)
        const { data: totalSalesData, error: salesError } = await supabase
          .from("orders")
          .select("total", { count: "exact" })
          .eq("status", "confirmed");
        if (salesError) throw salesError;
        const totalSales = totalSalesData?.reduce(
          (sum, order) => sum + Number(order.total),
          0
        );

        // 2️⃣ New Users (last 30 days)
        const { count: newUsersCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact" })
          .gte(
            "created_at",
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          );

        // 3️⃣ Pending Orders
        const { count: pendingOrdersCount } = await supabase
          .from("orders")
          .select("*", { count: "exact" })
          .eq("status", "Pending");

        // 4️⃣ Total Products
        const { count: totalProducts } = await supabase
          .from("products")
          .select("*", { count: "exact" });

        setStats([
          {
            label: "Total Sales",
            value: `$${totalSales?.toFixed(2) || 0}`,
            color: "#4caf50",
          },
          { label: "New Users (30d)", value: newUsersCount || 0, color: "#2196f3" },
          { label: "Pending Orders", value: pendingOrdersCount || 0, color: "#ff9800" },
          { label: "Products", value: totalProducts || 0, color: "#f44336" },
        ]);

        // 5️⃣ Recent Orders with customer info
        const { data: recentOrdersData, error: ordersError } = await supabase
          .from("orders")
          .select(`
            id,
            total,
            status,
            created_at,
            user_id,
            profiles(username)
          `) // join profiles table
          .order("created_at", { ascending: false })
          .limit(5);

        if (ordersError) throw ordersError;

        setRecentOrders(recentOrdersData || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <h2>Admin Overview</h2>

      {/* Stat Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              borderLeft: `5px solid ${stat.color}`,
            }}
          >
            <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{stat.label}</p>
            <h3 style={{ margin: "10px 0 0 0", fontSize: "24px" }}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Recent Transactions</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <th style={{ padding: "12px" }}>Order ID</th>
              <th style={{ padding: "12px" }}>Customer</th>
              <th style={{ padding: "12px" }}>Status</th>
              <th style={{ padding: "12px" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td style={{ padding: "12px" }}>#{order.id}</td>
                <td style={{ padding: "12px" }}>
                  {order.profiles?.username || "Unknown"}
                </td>
                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      color:
                        order.status?.toLowerCase() === "confirmed"
                          ? "green"
                          : order.status?.toLowerCase() === "pending"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: "12px" }}>${Number(order.total).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
