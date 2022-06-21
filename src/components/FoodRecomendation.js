import React, { useEffect, useState } from 'react';
import '../styles/recomendation.scss';

function FoodRecomendation() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const getFood = async () => {
      const apiData = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      );
      const apiFood = await apiData.json();
      const sugestions = 6;
      setFoods(apiFood.meals.slice(0, sugestions));
    };
    getFood();
  }, []);

  return (
    <div id="recomendation">
      { foods.map((food, index) => (
        <div
          className="recomendation-card"
          key={ food.idMeal }
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            src={ food.strMealThumb }
            alt={ food.strMeal }
          />
          <p data-testid={ `${index}-recomendation-title` }>{ food.strMeal }</p>
        </div>
      ))}
    </div>
  );
}

export default FoodRecomendation;
