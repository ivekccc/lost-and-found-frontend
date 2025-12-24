import React, { useState } from 'react';
import http from '../serivices/http-service';

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
      window.location.href = '/'; // redirect na home
    } catch (err: any) {
      setError(err.response?.data?.message || 'Greška pri prijavi');
    }
  };

  return (
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
      {error && <div>{error}</div>}
    </div>
  );
};

export default Login;
