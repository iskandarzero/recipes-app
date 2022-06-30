import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { foodApi, drinkApi } from '../../services/foodAndDrinkApi';
import { RecipesContext } from '../../context/RecipesContext';
import './styles.scss';

function SearchBar() {
  const [searchParam, setSearchParam] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const { setSearchResults } = useContext(RecipesContext);
  const history = useHistory();
  const location = useLocation();

  const searchApi = async () => {
    if (location.pathname === '/foods') {
      const apiResult = await foodApi(searchParam, searchValue);
      if (!apiResult) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        setSearchResults([]);
      } else if (apiResult.length === 1) {
        setSearchResults(apiResult);
        history.push(`/foods/${apiResult[0].idMeal}`);
      } else {
        setSearchResults(apiResult);
      }
    } else {
      const apiResult = await drinkApi(searchParam, searchValue);
      if (!apiResult) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        setSearchResults([]);
      } else if (apiResult.length === 1) {
        setSearchResults(apiResult);
        history.push(`/drinks/${apiResult[0].idDrink}`);
      } else {
        setSearchResults(apiResult);
      }
    }
  };

  const handleClick = () => {
    if (searchParam === 'f' && searchValue.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    searchApi();
  };

  return (
    <section id="search-bar">
      <input
        type="text"
        data-testid="search-input"
        placeholder="Search"
        value={ searchValue }
        onChange={ ({ target }) => setSearchValue(target.value) }
      />
      <div onChange={ ({ target }) => setSearchParam(target.value) } id="search-radio">
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
      <button data-testid="exec-search-btn" type="button" onClick={ handleClick }>
        Search
      </button>
    </section>
  );
}

export default SearchBar;
