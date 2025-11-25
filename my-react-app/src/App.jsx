// App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import NavBar from "./components/NavBar";
import AdminPanel from "./components/Admin/AdminPanel";
import "./App.css";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/dashboard" },
    });
    if (error) setMessage(error.message);
  };

  const handleEmailAuth = async () => {
    setMessage("");
    if (isSignup) {
      // Signup flow
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Signup successful! Check your email to confirm.");
      }
    } else {
      // Login flow
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.includes("Email not confirmed")) {
          setMessage("Email not confirmed. Please check your inbox.");
        } else {
          setMessage(error.message);
        }
      } else {
        setSession(data.session);
        navigate("/dashboard");
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setMessage("");
  };

  if (loading) return <h2>Loading...</h2>;

  if (session) {
    return (
      <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
        <h2>You are already signed in as {session.user.email}</h2>
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Sign Out</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h1>{isSignup ? "Sign Up" : "Login"}</h1>
      {message && <p style={{ color: "red" }}>{message}</p>}

      <div style={{ marginBottom: "20px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button onClick={handleEmailAuth} style={{ width: "100%", padding: "10px" }}>
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </div>

      <hr />

      <button onClick={handleGoogleLogin} style={{ width: "100%", padding: "10px", marginTop: "10px" }}>
        Sign in with Google
      </button>

      <p style={{ marginTop: "15px" }}>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          onClick={() => { setIsSignup(!isSignup); setMessage(""); }}
          style={{ color: "blue", cursor: "pointer" }}
        >
          {isSignup ? "Login" : "Sign Up"}
        </span>
      </p>
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
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h1>Dashboard (Protected)</h1>
      <button onClick={handleLogout}>Logout</button>
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

  if (loading) return <h2>Loading...</h2>;
  if (!session) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<AuthPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}
