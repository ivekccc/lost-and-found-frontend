
import React, { useState } from 'react';
import http from '../serivices/http-service';

const Home: React.FC = () => {
  const [secret, setSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSecret = async () => {
    setError(null);
    setSecret(null);
    try {
      const res = await http.get('/secret');
      setSecret(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Greška pri zahtevu');
    }
  };

  return (
    <div>
      <h1>Dobrodošli na Lost & Found!</h1>
      <p>Ovo je početna stranica.</p>
      <button onClick={handleSecret}>Prikaži secret podatke</button>
      {secret && <div>Secret: {JSON.stringify(secret)}</div>}
      {error && <div style={{color: 'red'}}>{error}</div>}
    </div>
  );
};

export default Home;
