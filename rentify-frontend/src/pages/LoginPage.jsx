import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const [token, setToken] = useState('');

  return (
    <div>
      <h1>Login</h1>
      <LoginForm setToken={setToken} />
    </div>
  );
};

export default LoginPage;
