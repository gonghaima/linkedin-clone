import React, { useState } from 'react';
import '../Sass/LoginComponent.scss';
import { LoginAPI, RegisterAPI } from '../api/AuthAPI';

const LoginComponent = () => {
  const login = async () => {
    const res = await LoginAPI(credentials.email, credentials.password);
    // const res = RegisterAPI(credentials.email, credentials.password);
    console.log({ res });
  };
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  return (
    <div className="login-wrapper">
      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
    </div>
  );
};

export default LoginComponent;
