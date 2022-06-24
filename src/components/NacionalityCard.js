import React, { useContext, useEffect, useState } from 'react';
import { RecipesContext } from '../context/RecipesContext';

function NacionalityCard() {
  const [nacionalities, setNacionalities] = useState([]);
  const { setFilteredResults } = useContext(RecipesContext);

  const teste = async (value) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`);
    const data = await response.json();

    setFilteredResults(await data.meals);
  };

  useEffect(() => {
    async function fetchNacionalities() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();

      setNacionalities(await data.meals);
    }
    fetchNacionalities();
    teste('American');
  }, []);

  return (
    <select
      data-testid="explore-by-nationality-dropdown"
      onChange={ ({ target }) => teste(target.value) }
    >
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
