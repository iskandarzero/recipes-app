import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/detail.scss';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function FoodDetail({ id }) {
  const [foods, setFoods] = useState([]);
  const [copied, setCopied] = useState('');
  const [favorite, setFavorite] = useState(false);
  const history = useHistory();

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

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipes && foods[0]) {
      setFavorite(JSON.parse(favoriteRecipes)
        .map((recipe) => recipe.id)
        .includes(foods[0].idMeal));
    }
  }, [foods]);

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

  function isRecipeDone() {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes && foods[0]) {
      return JSON.parse(doneRecipes)
        .map((recipe) => recipe.id)
        .includes(foods[0].idMeal);
    }
  }

  function isRecipeInProgress() {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes && foods[0]) {
      return Object.keys(JSON.parse(inProgressRecipes)?.meals)
        .includes(foods[0].idMeal);
    }
  }

  function deleteFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = favoriteRecipes
      .filter((recipe) => recipe.id !== foods[0].idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorite(false);
  }

  function addFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newRecipe = {
      id: foods[0].idMeal,
      type: 'food',
      nationality: foods[0].strArea,
      category: foods[0].strCategory,
      alcoholicOrNot: '',
      name: foods[0].strMeal,
      image: foods[0].strMealThumb,
    };
    if (favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...favoriteRecipes, newRecipe]));
    } else localStorage.setItem('favoriteRecipes', JSON.stringify([newRecipe]));
    setFavorite(true);
  }

  function handleShareBtn() {
    setCopied('Link copied!');
    navigator.clipboard.writeText(window.location.href);
  }

  const ingredients = filterdIngredients();
  const mesures = filterdMesures();
  const recipeDone = isRecipeDone();
  const recipeInProgress = isRecipeInProgress();

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
          <button data-testid="share-btn" type="button" onClick={ handleShareBtn }>
            <img src={ shareIcon } alt="share icon" />
            { copied }
          </button>

          {!favorite && (
            <button
              data-testid="favorite-btn"
              type="button"
              src={ whiteHeart }
              onClick={ addFavorite }
            >
              <img src={ whiteHeart } alt="white heart icon" />
            </button>
          )}

          {favorite && (
            <button
              data-testid="favorite-btn"
              type="button"
              src={ blackHeart }
              onClick={ deleteFavorite }
            >
              <img src={ blackHeart } alt="black heart icon" />
            </button>
          )}

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

      { !recipeDone && (
        <button
          id="start-btn"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/foods/${id}/in-progress`) }
        >
          { recipeInProgress && 'Continue Recipe' }
          { !recipeInProgress && 'Start Recipe' }
        </button>
      )}
    </div>
  );
}

export default FoodDetail;

FoodDetail.propTypes = {
  id: PropTypes.string.isRequired,
};
