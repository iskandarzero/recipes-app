import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Testa Componente Header', () => {
  it('Verifica se Elementos do Header se comporta', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const profileBtn = screen.getByTestId('profile-top-btn');
    const searchBtn = screen.getByTestId('search-top-btn');
    const title = screen.getByTestId('page-title');

    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title.innerHTML).toBe('Foods');

    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();

    userEvent.click(profileBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');

    userEvent.click(profileBtn);
    expect(pathname).toBe('/profile');
  });
});
