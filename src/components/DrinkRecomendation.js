import React, { useEffect, useState } from 'react';
import '../styles/recomendation.scss';

function DrinkRecomendation() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const getDrink = async () => {
      const apiData = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );
      const apiDrink = await apiData.json();
      const sugestions = 6;
      setDrinks(apiDrink.drinks.slice(0, sugestions));
    };
    getDrink();
  }, []);

  return (
    <div id="recomendation">
      { drinks.map((drink, index) => (
        <div
          className="recomendation-card"
          key={ drink.idDrink }
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <p data-testid={ `${index}-recomendation-title` }>{ drink.strDrink }</p>
        </div>
      ))}
    </div>
  );
}

export default DrinkRecomendation;
