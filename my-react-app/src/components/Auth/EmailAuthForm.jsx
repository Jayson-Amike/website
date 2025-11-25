export default function EmailAuthForm({ email, setEmail, password, setPassword, isSignup, onSubmit }) {
  return (
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
      <button onClick={onSubmit} style={{ width: "100%", padding: "10px" }}>
        {isSignup ? "Sign Up" : "Login"}
      </button>
    </div>
  );
}
