// src/components/Auth/AuthPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

const AuthPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
      if (data.session) navigate("/dashboard");
    });

    // Listen for auth changes
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
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage("Signup successful! Check your email to confirm.");
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.includes("Email not confirmed")) {
          setMessage("Email not confirmed. Please check your inbox.");
        } else setMessage(error.message);
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

      {/* Email / Password Form */}
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

      {/* Google OAuth */}
      <button
        onClick={handleGoogleLogin}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      >
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
};

export default AuthPage;
