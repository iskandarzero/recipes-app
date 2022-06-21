import React, { useContext } from 'react';
import { RecipesContext } from '../context/RecipesContext';

function RecipeCard() {
  const { searchResults } = useContext(RecipesContext);
  let filteredRecipes = [];
  const maxRecipes = 12;
  if (searchResults.length > 1) {
    filteredRecipes = searchResults.slice(0, maxRecipes);
  }
  return (
    <main>
      {filteredRecipes.map((recipe, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ index }>
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
        </div>
      ))}
    </main>
  );
}

export default RecipeCard;
