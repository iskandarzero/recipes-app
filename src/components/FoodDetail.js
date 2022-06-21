import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/detail.scss';

function FoodDetail({ id }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const getFood = async () => {
      const apiData = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const apiFood = await apiData.json();
      setFoods(apiFood.meals);
    };
    getFood();
  }, [id]);

  function filterdIngredients() {
    if (foods[0]) {
      return Object.entries(foods[0])
        .filter((attr) => attr[0].includes('trIngredient') && attr[1] !== null)
        .map((ingredient) => ingredient[1]);
    }
  }

  function filterdMesures() {
    if (foods[0]) {
      return Object.entries(foods[0])
        .filter((attr) => attr[0].includes('strMeasure') && attr[1] !== null)
        .map((mesure) => mesure[1]);
    }
  }

  function isDoneRecipe() {
    const recipeData = localStorage.getItem('doneRecipes');
    if (recipeData && foods[0]) {
      return JSON.parse(recipeData)
        .map((recipe) => recipe.id)
        .includes(foods[0].idMeal);
    }
  }

  const ingredients = filterdIngredients();
  const mesures = filterdMesures();

  return (
    <div id="detail-page">
      { foods.map((food) => (
        <div key={ food.idMeal }>
          <img
            data-testid="recipe-photo"
            src={ food.strMealThumb }
            alt={ food.strMeal }
          />
          <h1 data-testid="recipe-title">{ food.strMeal }</h1>
          <button data-testid="share-btn" type="button">Share</button>
          <button data-testid="favorite-btn" type="button">Favorite</button>
          <p data-testid="recipe-category">{ food.strCategory }</p>
          <div>
            { ingredients.map((ingredient, index) => (
              <p data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
                {`${ingredient} ${mesures[index] ? mesures[index] : ''}`}
              </p>
            )) }
          </div>
          <p data-testid="instructions">{food.strInstructions}</p>
          <iframe
            data-testid="video"
            width="450"
            height="290"
            src={ `https://www.youtube.com/embed/${food.strYoutube.split('?v=').pop()}` }
            title="YouTube video player"
            frameBorder="0"
          />
        </div>
      ))}

      { !isDoneRecipe() && (
        <button
          id="start-btn"
          data-testid="start-recipe-btn"
          type="button"
        >
          Start Recipe
        </button>
      )}
    </div>
  );
}

export default FoodDetail;

FoodDetail.propTypes = {
  id: PropTypes.string.isRequired,
};
