import React from 'react';
export default function GoogleLoginButton({ onLogin }) {
  return (
    <button
      onClick={onLogin}
      style={{ width: "100%", padding: "10px", marginTop: "10px" }}
    >
      Sign in with Google
    </button>
  );
}

