import React, { useState } from 'react';
import http from '../serivices/http-service';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = '1063269578049-o9soc86q7r5gvruurs3se01ftnhckha7.apps.googleusercontent.com'; // zameni sa pravim clientId

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await http.post('/auth/login', { username, password });
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.response?.data?.message || 'Greška pri prijavi');
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError('');
    try {
      const res = await http.post('/auth/google', { credential: credentialResponse.credential });
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.response?.data?.message || 'Google login greška');
    }
  };

  const handleGoogleError = () => {
    setError('Google login neuspešan');
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div>
        <h2>Prijava</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Korisničko ime"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Prijavi se</button>
        </form>
        <div style={{ margin: '20px 0' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
          />
        </div>
        {error && <div>{error}</div>}
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
