import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/detail.scss';
import { useHistory } from 'react-router-dom';
import ShareButton from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

function DrinkDetail({ id }) {
  const [drinks, setDrinks] = useState([]);
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
          <ShareButton />
          { drinks.length > 0 && <FavoriteBtn recipe={ drinks[0] } /> }
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
