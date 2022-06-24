import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RecipesContext } from '../context/RecipesContext';
import { drinkApi, foodApi } from '../services/foodAndDrinkApi';

function IngredientsCards({ param }) {
  const [ingredients, setIngredients] = useState([]);
  const location = useLocation();
  const { setFilteredResults } = useContext(RecipesContext);
  const maxIngredient = 12;
  useEffect(() => {
    async function fetchIngredient() {
      const response = await fetch(`https://www.${param}.com/api/json/v1/1/list.php?i=list`);
      const data = await response.json();

      if (location.pathname.includes('foods')) {
        setIngredients(await data.meals.slice(0, maxIngredient));
      } else {
        setIngredients(await data.drinks.slice(0, maxIngredient));
      }
    }
    fetchIngredient();
  }, []);

  const teste = async (ingredient) => {
    if (location.pathname.includes('foods')) {
      setFilteredResults(await foodApi('i', ingredient));
    } else {
      setFilteredResults(await drinkApi('i', ingredient));
    }
  };

  return (
    <div>
      {ingredients.length > 0 && ingredients.map((ingredient, index) => (
        <Link
          data-testid={ `${index}-ingredient-card` }
          key={ index }
          onClick={ () => teste(ingredient.strIngredient || ingredient.strIngredient1) }
          to={ location.pathname.includes('foods') ? '/foods' : '/drinks' }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.${param}.com/images/ingredients/${ingredient.strIngredient || ingredient.strIngredient1}-Small.png` }
            alt={ ingredient.strIngredient || ingredient.strIngredient1 }
          />
          <h3
            data-testid={ `${index}-card-name` }
          >
            {ingredient.strIngredient || ingredient.strIngredient1}
          </h3>
        </Link>
      ))}
    </div>
  );
}

IngredientsCards.propTypes = {
  param: PropTypes.string.isRequired,
};

export default IngredientsCards;
