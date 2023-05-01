import React from 'react';
import '../Sass/LoginComponent.scss';
import { LoginAPI } from '../api/AuthAPI';

const LoginComponent = () => {
  const login = () => {
    LoginAPI();
  };
  return (
    <div>
      <h1>LoginComponent</h1>
      <button onClick={login} className="login-btn">
        Log In to LinkedIn
      </button>
    </div>
  );
};

export default LoginComponent;
