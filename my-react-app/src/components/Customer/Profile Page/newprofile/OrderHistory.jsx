import { useEffect, useState } from "react";
import supabase from "../../../../supabaseClient";

const OrderHistory = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      // 1️⃣ Get the current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUser(user);

      // 2️⃣ Safely query orders only if user exists
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        // Make sure your column matches your table!
        // If your orders table uses user_email:
        // .eq("user_email", user.email)
        // OR if it uses user_id:
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data || []);
      }

      setLoading(false);
    }

    fetchOrders();
  }, []);

  if (loading) return <p>Loading your orders...</p>;
  if (!user) return <p>Please log in to see your orders.</p>;
  if (!orders.length) return <p>You have no orders yet.</p>;

  return (
    <div>
      <h2>Your Order History</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>{order.product_name}</strong> - ${order.price} -{" "}
            {order.status} - {new Date(order.created_at).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
