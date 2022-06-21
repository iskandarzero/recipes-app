import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { foodApi } from '../services/foodAndDrinkApi';

export const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    async function fetchRecipes() {
      setSearchResults(await foodApi('s', ''));
    }
    fetchRecipes();
  }, []);

  const context = {
    setSearchResults,
    searchResults,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
