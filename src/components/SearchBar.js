import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { foodApi, drinkApi } from '../services/foodAndDrinkApi';
import { RecipesContext } from '../context/RecipesContext';

function SearchBar() {
  const [searchParam, setSearchParam] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const { setSearchResults } = useContext(RecipesContext);
  const location = useLocation();

  const searchApi = async () => {
    if (location.pathname === '/foods') {
      console.log(searchParam, searchValue);
      setSearchResults(await foodApi(searchParam, searchValue));
    } else {
      setSearchResults(await drinkApi(searchParam, searchValue));
    }
  };

  return (
    <section>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Search"
        value={ searchValue }
        onChange={ ({ target }) => setSearchValue(target.value) }
      />
      <div onChange={ ({ target }) => setSearchParam(target.value) }>
        <label htmlFor="ingredient-search">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="searchParam"
            id="ingredient-search"
            value="i"
          />
          Ingredient
        </label>
        <label htmlFor="name-search">
          <input
            data-testid="name-search-radio"
            type="radio"
            name="searchParam"
            id="name-search"
            value="s"
          />
          Name
        </label>
        <label htmlFor="letter-search">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="searchParam"
            id="letter-search"
            value="f"
          />
          First Letter
        </label>
      </div>
      <button data-testid="exec-search-btn" type="button" onClick={ searchApi }>
        Search
      </button>
    </section>
  );
}

export default SearchBar;
