import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import Profile from '../pages/Profile';

const email = '{ "email": "email@mail.com" }';
describe('Testa Componente Header', () => {
  localStorage.setItem('user', email);
  it('Todos o data-testid do email e de todos os botões', () => {
    renderWithRouter(<Profile />);
    const profileEmail = screen.getByTestId('profile-email');
    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    const profileFavBtn = screen.getByTestId('profile-favorite-btn');
    const profileLogOutBtn = screen.getByTestId('profile-logout-btn');

    expect(profileEmail).toBeInTheDocument();
    expect(profileDoneBtn).toBeInTheDocument();
    expect(profileFavBtn).toBeInTheDocument();
    expect(profileLogOutBtn).toBeInTheDocument();
  });

  it('Redireciona para a rota correta', () => {
    const { history } = renderWithRouter(<Profile />);

    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    const profileFavBtn = screen.getByTestId('profile-favorite-btn');
    const profileLogOutBtn = screen.getByTestId('profile-logout-btn');

    userEvent.click(profileDoneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
    userEvent.click(profileFavBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
    userEvent.click(profileLogOutBtn);
    expect(history.location.pathname).toBe('/');
  });
});
