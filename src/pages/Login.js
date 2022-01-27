import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setLocalStorage } from '../services/LocalStorage';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const valid = () => {
      // Regex Valida E-mail: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
      const regexValidaEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?$/i;
      const emailValidation = regexValidaEmail.test(String(email).toLowerCase());
      const testPassword = password.length > +'6';
      setDisabled(!(emailValidation && testPassword));
    };
    valid();
  }, [email, password]);

  const handleClickLogin = () => {
    setLocalStorage('mealsToken', 1);
    setLocalStorage('cocktailsToken', 1);
    setLocalStorage('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  return (
    <div>
      <input
        type="email"
        // name="email"
        // value={ email }
        data-testid="email-input"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        type="password"
        // name="password"
        // value={ password }
        onChange={ ({ target }) => setPassword(target.value) }
        data-testid="password-input"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disabled }
        onClick={ handleClickLogin }
      >
        Entrar
      </button>
    </div>
  );
};

export default Login;
