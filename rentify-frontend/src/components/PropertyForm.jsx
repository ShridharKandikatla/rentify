import React, { useState } from 'react';
import { api } from '../services/api';

const PropertyForm = ({ token }) => {
  const [form, setForm] = useState({
    location: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    amenities: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/properties', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Property posted successfully!');
    } catch (error) {
      alert('Error posting property');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name='location' placeholder='Location' onChange={handleChange} />
      <input name='area' placeholder='Area' onChange={handleChange} />
      <input name='bedrooms' placeholder='Bedrooms' onChange={handleChange} />
      <input name='bathrooms' placeholder='Bathrooms' onChange={handleChange} />
      <input name='amenities' placeholder='Amenities' onChange={handleChange} />
      <button type='submit'>Post Property</button>
    </form>
  );
};

export default PropertyForm;
