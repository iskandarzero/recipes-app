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

  const foodId = (ingredient) => {
    const progressArr = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (Object.keys(progressArr.meals).includes(id)) {
      if (progressArr.meals[id].includes(ingredient)) {
        setProgress(JSON.parse(localStorage.getItem('inProgressRecipes')).meals[id]);
      } else {
        progressArr.meals[id] = [...progressArr.meals[id], ingredient];
      }
    } else {
      progressArr.meals = {
        ...progressArr.meals,
        [id]: [ingredient],
      };
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(progressArr));
    setProgress(JSON.parse(localStorage.getItem('inProgressRecipes')).meals[id]);
  };

  const drinkId = (ingredient) => {
    const progressArr = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (Object.keys(progressArr.cocktails).includes(id)) {
      if (progressArr.cocktails[id].includes(ingredient)) {
        setProgress(JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[id]);
      } else {
        progressArr.cocktails[id] = [...progressArr.cocktails[id], ingredient];
      }
    } else {
      progressArr.cocktails = {
        ...progressArr.cocktails,
        [id]: [ingredient],
      };
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(progressArr));
    setProgress(JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails[id]);
  };

  const saveIngredient = (ingredient) => {
    if (localStorage.getItem('inProgressRecipes')) {
      if (location.pathname.includes('foods')) {
        foodId(ingredient);
      } else {
        drinkId(ingredient);
      }
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
      let filteredIgredients = [];
      if (location.pathname.includes('foods')) {
        filteredIgredients = ingredients
          .filter((ingredient) => recipe[ingredient] !== '');
      } else {
        filteredIgredients = ingredients
          .filter((ingredient) => recipe[ingredient] !== null);
      }
      progress.sort((a, b) => Number(a
        .slice(maxCharacters)) - Number(b.slice(maxCharacters)));
      const equals = JSON.stringify(progress) === JSON.stringify(filteredIgredients);
      return !equals;
    }
    return true;
  };

  const checkboxChecked = (ingredient) => {
    if (progress) {
      return progress.includes(ingredient);
    }
    return false;
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
              checked={ checkboxChecked(ingredient) }
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
