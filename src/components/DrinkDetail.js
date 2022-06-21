import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function DrinkDetail({ id }) {
  const [drinks, setDrinks] = useState([]);

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

  const ingredients = filterdIngredients();
  const mesures = filterdMesures();

  return (
    <div>
      { drinks.map((drink) => (
        <div key={ drink.idDrink }>
          <img
            data-testid="recipe-photo"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
          <button data-testid="share-btn" type="button">Share</button>
          <button data-testid="favorite-btn" type="button">Favorite</button>
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
      <button data-testid="start-recipe-btn" type="button">Start Recipe</button>
    </div>
  );
}

export default DrinkDetail;

DrinkDetail.propTypes = {
  id: PropTypes.string.isRequired,
};
