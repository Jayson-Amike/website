import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../supabaseClient";

export default function AdminProtectedRoute({ children }) {
  // const [loading, setLoading] = useState(true);
  // const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   async function checkAdmin() {
  //     const { data: { session } } = await supabase.auth.getSession();

  //     if (!session) {
  //       setLoading(false);
  //       return;
  //     }

  //     const { data } = await supabase
  //       .from("profiles")
  //       .select("role")
  //       .eq("id", session.user.id)
  //       .single();

  //     setIsAdmin(data?.role === "admin");
  //     setLoading(false);
  //   }

  //   checkAdmin();
  // }, []);

  // if (loading) return <p>Loading...</p>;
  // if (!isAdmin) return <Navigate to="/dashboard" replace />;

  // return children;
}
