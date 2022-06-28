import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { User, MagnifyingGlass } from 'phosphor-react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';
import './styles.scss';

function Header({ title, search }) {
  const history = useHistory();
  const [toggle, setToggle] = useState(false);

  return (
    <div id="header">
      <header>
        <button
          data-testid="profile-top-btn"
          type="button"
          onClick={ () => history.push('/profile') }
          src={ profileIcon }
        >
          <User size={ 40 } />
        </button>

        <h1 data-testid="page-title">{title}</h1>

        {search && (
          <button
            data-testid="search-top-btn"
            type="button"
            onClick={ () => setToggle(!toggle) }
            src={ searchIcon }
          >
            <MagnifyingGlass size={ 40 } />
          </button>
        )}
        {!search && (
          <p>x</p>
        )}
      </header>
      { toggle && <SearchBar /> }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.bool,
};

Header.defaultProps = {
  search: true,
};

export default Header;
