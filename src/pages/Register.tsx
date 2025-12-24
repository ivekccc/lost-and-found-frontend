import React, { useState } from 'react';
import http from '../serivices/http-service';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await http.post('/auth/register', { username, password });
      setSuccess('Uspešna registracija!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Greška pri registraciji');
    }
  };

  return (
    <div>
      <h2>Registracija</h2>
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
        <button type="submit">Registruj se</button>
      </form>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
    </div>
  );
};

export default Register;
