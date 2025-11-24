// console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);
// console.log("SUPABASE KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);


import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const { data, error } = await supabase
        .from("product")
        .select("*");

      if (error) {
        console.error("Supabase error:", error);
      } else {
        setUsers(data);

      }
      
    }

    loadUsers();
  }, []);

  return (
  <div>
    <h1>Users</h1>
    {users.length === 0 && <p>No users found.</p>}
    {users.map((u) => (
      <p key={u.product_id}>{u.price}</p>
    ))}
  </div>
);
}
