import React, { useState } from 'react';
import api from '../services/api';

const RegisterForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'buyer',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed!');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        name='firstName'
        placeholder='First Name'
        onChange={handleChange}
      />
      <input name='lastName' placeholder='Last Name' onChange={handleChange} />
      <input name='email' placeholder='Email' onChange={handleChange} />
      <input
        name='password'
        type='password'
        placeholder='Password'
        onChange={handleChange}
      />
      <select name='role' onChange={handleChange}>
        <option value='buyer'>Buyer</option>
        <option value='seller'>Seller</option>
      </select>
      <button type='submit'>Register</button>
    </form>
  );
};

export default RegisterForm;
