import { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (password === "admin123") { // simple demo password
      onLogin(true);
    } else {
      alert("Incorrect password");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login as Admin</button>
    </form>
  );
}
