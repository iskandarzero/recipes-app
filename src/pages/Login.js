import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    <main>
      <input
        data-testid="email-input"
        type="text"
        placeholder="email"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        data-testid="password-input"
        type="password"
        placeholder="senha"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ !(password.length > minPassword && regex.test(email)) }
        onClick={ btnSubmit }
      >
        Enter
      </button>
    </main>

  );
}

export default Login;
