import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

function InProgress({ match: { params: { id } } }) {
  const location = useLocation();
  const [recipe, setRecipe] = useState([]);
  const [progress, setProgress] = useState([]);

  const ingredients = Object.keys(recipe).filter((key) => key.includes('strIngredient'));

  useEffect(() => {
    const param = location.pathname.includes('foods') ? 'meals' : 'cocktails';
    if (localStorage.getItem('inProgressRecipes')) {
      setProgress(JSON.parse(localStorage.getItem('inProgressRecipes'))[param][id]);
    }
  }, []);

  useEffect(() => {
    const getRecipe = async () => {
      let apiData = '';
      if (location.pathname.includes('foods')) {
        apiData = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
      } else {
        apiData = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
      }
      const apiRecipe = await apiData.json();
      const param = location.pathname.includes('foods') ? 'meals' : 'drinks';
      setRecipe(...apiRecipe[param]);
    };
    getRecipe();
  }, [id]);

  const saveIngredient = (ingredient) => {
    if (localStorage.getItem('inProgressRecipes')) {
      const progressArr = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const param = location.pathname.includes('foods') ? 'meals' : 'cocktails';
      if (location.pathname.includes('foods')) {
        if (Object.keys(progressArr.meals).includes(id)) {
          progressArr.meals[id] = [...progressArr.meals[id], ingredient];
        } else {
          progressArr.meals = { [id]: [ingredient] };
        }
      } else if (Object.keys(progressArr.cocktails).includes(id)) {
        progressArr.cocktails[id] = [...progressArr.cocktails[id], ingredient];
      } else {
        progressArr.cocktails = { [id]: [ingredient] };
      }

      localStorage.setItem('inProgressRecipes', JSON.stringify(progressArr));
      setProgress(JSON.parse(localStorage.getItem('inProgressRecipes'))[param][id]);
    } else if (location.pathname.includes('foods')) {
      const progressArr = {
        meals: { [id]: [ingredient] },
        cocktails: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressArr));
      setProgress([ingredient]);
    } else {
      const progressArr = {
        meals: {},
        cocktails: { [id]: [ingredient] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressArr));
      setProgress([ingredient]);
    }
  };

  const checkIgredients = () => {
    if (progress) {
      const maxCharacters = 13;
      const filteredIgredients = ingredients
        .filter((ingredient) => recipe[ingredient] !== '');
      progress.sort((a, b) => Number(a
        .slice(maxCharacters)) - Number(b.slice(maxCharacters)));
      const equals = JSON.stringify(progress) === JSON.stringify(filteredIgredients);
      return !equals;
    }
    return true;
  };

  return (
    <main>
      <h2 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink}</h2>
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
      />
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      {ingredients.map((ingredient, index) => (recipe[ingredient] && (
        <div key={ index }>
          <label
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ ingredient }
          >
            <input
              type="checkbox"
              id={ ingredient }
              onChange={ () => saveIngredient(ingredient) }
              checked={ progress.includes(ingredient) }
            />
            {recipe[ingredient]}
          </label>
        </div>)))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ checkIgredients() }
      >
        Finish recipe!
      </button>
    </main>
  );
}

InProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default InProgress;
