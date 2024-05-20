import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { setAuthToken } from './services/api';

const App = () => {
  const [token, setToken] = useState('');

  const handleToken = (newToken) => {
    setToken(newToken);
    setAuthToken(newToken);
  };

  return (
    <Router>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        <Link to='/post-property'>Post Property</Link>
      </nav>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/login'>
          <LoginPage setToken={handleToken} />
        </Route>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/post-property'>
          <PostPropertyPage token={token} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
