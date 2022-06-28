import React, { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../../context/RecipesContext';
import { foodApi } from '../../services/foodAndDrinkApi';
import './styles.scss';

function NacionalityCard() {
  const [nacionalities, setNacionalities] = useState([]);
  const { setFilteredResults, setSearchResults } = useContext(RecipesContext);

  const teste = async (value) => {
    if (value === 'All') {
      setFilteredResults([]);
    } else {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`);
      const data = await response.json();

      setFilteredResults(await data.meals);
    }
  };

  useEffect(() => {
    async function fetchNacionalities() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();

      setNacionalities(await data.meals);
      setSearchResults(await foodApi('s', ''));
    }
    fetchNacionalities();
  }, []);

  return (
    <select
      id="nacionality-input"
      data-testid="explore-by-nationality-dropdown"
      onChange={ ({ target }) => teste(target.value) }
    >
      <option data-testid="All-option">All</option>
      {nacionalities.map((nacionality, index) => (
        <option
          data-testid={ `${nacionality.strArea}-option` }
          key={ index }
        >
          {nacionality.strArea}
        </option>
      ))}
    </select>
  );
}

export default NacionalityCard;
