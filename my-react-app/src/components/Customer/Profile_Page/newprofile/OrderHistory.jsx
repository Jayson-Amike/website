import React from 'react';
import { useEffect, useState, useMemo } from "react";
import supabase from "../../../../supabaseClient";

const OrderHistory = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest"); // newest or oldest

  useEffect(() => {
    async function fetchOrders() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching orders:", error);
      else setOrders(data || []);

      setLoading(false);
    }

    fetchOrders();
  }, []);

  // Filtered + sorted orders
  const filteredOrders = useMemo(() => {
    let filtered = orders.filter((order) => {
      const matchesSearch =
        search === "" ||
        order.product_name?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) =>
      sortOrder === "oldest"
        ? new Date(a.created_at) - new Date(b.created_at)
        : new Date(b.created_at) - new Date(a.created_at)
    );

    return filtered;
  }, [orders, search, statusFilter, sortOrder]);

  if (loading) return <p>Loading your orders...</p>;
  if (!user) return <p>Please log in to see your orders.</p>;

  return (
    <div style={wrapperStyle}>
      <h2>Order History</h2>

      {/* Filters */}
      <div style={filterBar}>
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={filterInput}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={filterSelect}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
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
      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div style={cardStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={th}>Order ID</th>
                <th style={th}>Product</th>
                <th style={th}>Status</th>
                <th style={th}>Price</th>
                <th style={th}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td style={td}>#{order.id}</td>
                  <td style={td}>{order.product_name || "â€”"}</td>
                  <td
                    style={{
                      ...td,
                      color:
                        order.status === "confirmed"
                          ? "green"
                          : order.status === "pending"
                          ? "orange"
                          : "#555",
                    }}
                  >
                    {order.status || "â€”"}
                  </td>
                  <td style={td}>${Number(order.price).toFixed(2)}</td>
                  <td style={td}>{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

/* ===================== STYLES ===================== */

const wrapperStyle = { padding: "20px", minHeight: "80vh", backgroundColor: "#f4f7f6" };
const cardStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};
const tableStyle = { width: "100%", borderCollapse: "collapse", textAlign: "left" };
const th = { padding: "12px", fontSize: "13px", color: "#666", borderBottom: "1px solid #eee" };
const td = { padding: "12px" };
const filterBar = { display: "flex", gap: "12px", marginBottom: "16px" };
const filterInput = { padding: "8px 10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px" };
const filterSelect = { padding: "8px 10px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "14px" };

