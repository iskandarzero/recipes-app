import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const RecipesContext = createContext();

export function RecipesProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const context = {
    setSearchResults,
    searchResults,
    setFilteredResults,
    filteredResults,
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
