import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const history = useHistory();
  const [toggle, setToggle] = useState(false);

  return (
    <header>
      <button
        data-testid="profile-top-btn"
        type="button"
        onClick={ () => history.push('/profile') }
        src={ profileIcon }
      >
        <img src={ profileIcon } alt="Profile Icon" />
      </button>

      <h1 data-testid="page-title">{title}</h1>

      <button
        data-testid="search-top-btn"
        type="button"
        onClick={ () => setToggle(!toggle) }
        src={ searchIcon }
      >
        <img src={ searchIcon } alt="Profile Icon" />
      </button>

      {toggle && (
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search"
        />
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
