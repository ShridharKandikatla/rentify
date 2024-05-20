import React, { useState } from 'react';
import PropertyList from '../components/PropertyList';

const HomePage = () => {
  const [token, setToken] = useState('');

  return (
    <div>
      <h1>Rentify - Where Renting Meets Simplicity</h1>
      <PropertyList token={token} />
    </div>
  );
};

export default HomePage;
