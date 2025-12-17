// src/Login.jsx
import React from 'react';
import { supabase } from './supabaseClient';

export default function Login() {
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: import.meta.env.VITE_REDIRECT_URL || 'http://localhost:3000/'
      }
    });
    if (error) console.error('Supabase OAuth error:', error);
  };

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexDirection: 'column' }}>
      <h2>Sign in</h2>
      <button onClick={loginWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}
