import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from './helper/renderWithRouter';

describe('Testa Tela de Login', () => {
  beforeEach(() => {
    renderWithRouter(<Login />);
  });

  it('Verifica se contém inputs de email e senha', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    userEvent.type(emailInput, 'test@teste.com');

    expect(passwordInput).toBeInTheDocument();

    userEvent.type(passwordInput, '12345');
    expect(buttonLogin).toBeDisabled();

    userEvent.type(passwordInput, '1234567');
    expect(buttonLogin).toBeEnabled();
    expect(buttonLogin).toBeInTheDocument();

    userEvent.click(buttonLogin);

    expect(window.localStorage.getItem('user')).toEqual('{"email":"test@teste.com"}');
    expect(window.localStorage.getItem('mealsToken')).toEqual('1');
    expect(window.localStorage.getItem('cocktailsToken')).toEqual('1');
  });
});
