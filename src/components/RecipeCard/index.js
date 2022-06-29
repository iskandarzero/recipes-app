import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext';
import './styles.scss';

function RecipeCard() {
  const { searchResults, filteredResults } = useContext(RecipesContext);
  const location = useLocation();
  let filteredRecipes = [];
  const maxRecipes = 12;
  if (filteredResults && filteredResults.length > 0) {
    filteredRecipes = filteredResults.slice(0, maxRecipes);
  } else if (searchResults.length > 0) {
    filteredRecipes = searchResults.slice(0, maxRecipes);
  }

  return (
    <main id="recipe-grid">
      {filteredRecipes.length > 0 && filteredRecipes.map((recipe, index) => (
        <Link
          key={ index }
          data-testid={ `${index}-recipe-card` }
          to={ location.pathname.includes('nationalities')
            ? `/foods/${recipe.idMeal}`
            : `${location.pathname}/${recipe.idMeal || recipe.idDrink}` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
          />
          <h3
            data-testid={ `${index}-card-name` }
          >
            {recipe.strMeal || recipe.strDrink}
          </h3>
        </Link>
      ))}
    </main>
  );
}

export default RecipeCard;
