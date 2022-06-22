import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/detail.scss';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function DrinkDetail({ id }) {
  const [drinks, setDrinks] = useState([]);
  const [copied, setCopied] = useState('');
  const [favorite, setFavorite] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getDrink = async () => {
      const apiData = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const apiDrink = await apiData.json();
      setDrinks(apiDrink.drinks);
    };
    getDrink();
  }, [id]);

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipes && drinks[0]) {
      setFavorite(JSON.parse(favoriteRecipes)
        .map((recipe) => recipe.id)
        .includes(drinks[0].idDrink));
    }
  }, [drinks]);

  function filterdIngredients() {
    if (drinks[0]) {
      return Object.entries(drinks[0])
        .filter((attr) => attr[0].includes('trIngredient') && attr[1] !== null)
        .map((ingredient) => ingredient[1]);
    }
  }

  function filterdMesures() {
    if (drinks[0]) {
      return Object.entries(drinks[0])
        .filter((attr) => attr[0].includes('strMeasure') && attr[1] !== null)
        .map((mesure) => mesure[1]);
    }
  }

  function isRecipeDone() {
    const doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes && drinks[0]) {
      return JSON.parse(doneRecipes)
        .map((recipe) => recipe.id)
        .includes(drinks[0].idDrink);
    }
  }

  function isRecipeInProgress() {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes && drinks[0]) {
      return Object.keys(JSON.parse(inProgressRecipes)?.cocktails)
        .includes(drinks[0].idDrink);
    }
  }

  function deleteFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = favoriteRecipes
      .filter((recipe) => recipe.id !== drinks[0].idDrink);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorite(false);
  }

  function addFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newRecipe = {
      id: drinks[0].idDrink,
      type: 'drink',
      nationality: '',
      category: drinks[0].strCategory,
      alcoholicOrNot: drinks[0].strAlcoholic,
      name: drinks[0].strDrink,
      image: drinks[0].strDrinkThumb,
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
      { drinks.map((drink) => (
        <div key={ drink.idDrink }>
          <img
            data-testid="recipe-photo"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
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

          <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
          <div>
            { ingredients.map((ingredient, index) => (
              <p
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ ingredient }
              >
                {`${ingredient} ${mesures[index] ? mesures[index] : ''}`}
              </p>
            )) }
          </div>
          <p data-testid="instructions">{drink.strInstructions}</p>
        </div>
      ))}
      { !recipeDone && (
        <button
          id="start-btn"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(`/drinks/${id}/in-progress`) }
        >
          { recipeInProgress && 'Continue Recipe' }
          { !recipeInProgress && 'Start Recipe' }
        </button>
      )}
    </div>
  );
}

export default DrinkDetail;

DrinkDetail.propTypes = {
  id: PropTypes.string.isRequired,
};
