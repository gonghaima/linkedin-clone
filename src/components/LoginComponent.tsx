import React, { useState } from 'react';
import '../Sass/LoginComponent.scss';
import LinkedinLogo from '../assets/linkedinLogo.png';
import { GoogleSignInAPI, LoginAPI } from '../api/AuthAPI';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { toast } from 'react-toastify';

const LoginComponent = () => {
  const navigate = useNavigate();
  const login = async () => {
    const res = await LoginAPI(credentials.email, credentials.password);
    toast.success('Signed In to Linkedin!');
    // const res = RegisterAPI(credentials.email, credentials.password);
    console.log({ res });
    navigate('/home');
  };

  const googleSignIn = async () => {
    const response = await GoogleSignInAPI();
    console.log({ response });
  };

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" />
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

      <div className="google-btn-container">
        <GoogleButton className="google-btn" onClick={googleSignIn} />
        <p className="go-to-signup">
          New to LinkedIn?{' '}
          <span className="join-now" onClick={() => navigate('/register')}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
