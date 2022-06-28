import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import cooking from '../../images/cooking.png';
import './styles.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const regex = /\S+@\S+\.\S+/;
  const minPassword = 6;

  function btnSubmit() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  }

  return (
    <main id="login">
      <div id="logo">
        <img src={ cooking } alt="logo" />
        <h1>Recipe App</h1>
      </div>
      <input
        data-testid="email-input"
        className="input"
        id="email"
        type="text"
        placeholder="Email"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        data-testid="password-input"
        className="input"
        id="password"
        type="password"
        placeholder="Password"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        id="loginBtn"
        disabled={ !(password.length > minPassword && regex.test(email)) }
        onClick={ btnSubmit }
      >
        Login
      </button>
    </main>

  );
}

export default Login;
