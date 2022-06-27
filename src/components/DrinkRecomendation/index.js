import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
      <h3>Recomendation</h3>
      <Carousel
        horizontal
      >
        { drinks.map((drink, index) => (
          <div
            key={ drink.idDrink }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
            <p
              data-testid={ `${index}-recomendation-title` }
              className="legend"
            >
              { drink.strDrink }
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default DrinkRecomendation;
