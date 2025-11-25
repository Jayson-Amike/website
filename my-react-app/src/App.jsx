// App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Shared styles
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f0f2f5",
};

const cardStyle = {
  padding: "40px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  textAlign: "center",
  minWidth: "300px",
};

const buttonStyle = {
  padding: "10px 20px",
  marginTop: "20px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#4CAF50",
  color: "#fff",
};

const secondaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#f44336",
  marginLeft: "10px",
};

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
      if (data.session) navigate("/dashboard");
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) navigate("/dashboard");
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/dashboard" },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  if (!session) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1>Login</h1>
          <p>Sign in with your Google account to continue</p>
          <button style={buttonStyle} onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Welcome, {session.user.email}</h2>
        <p>You are already signed in.</p>
        <button style={buttonStyle} onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
        <button style={secondaryButtonStyle} onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1>Dashboard</h1>
        <p>This is a protected page.</p>
        <button style={buttonStyle} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (!session) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<h1 style={{ textAlign: "center" }}>Not Found</h1>} />
    </Routes>
  );
}
