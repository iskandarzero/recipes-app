import React from 'react';
import { useLocation } from 'react-router-dom';
import FoodDetail from '../../components/FoodDetail';
import DrinkDetail from '../../components/DrinkDetail';
import DrinkRecomendation from '../../components/DrinkRecomendation';
import FoodRecomendation from '../../components/FoodRecomendation';

function Recipe() {
  const { pathname } = useLocation();
  const isDrink = pathname.includes('drinks');
  const isFood = pathname.includes('foods');
  const id = pathname.split('/').pop();

  return (
    <div>
      { isFood && (
        <>
          <FoodDetail id={ id } />
          <DrinkRecomendation />
        </>
      )}
      {isDrink && (
        <>
          <DrinkDetail id={ id } />
          <FoodRecomendation />
        </>
      )}
    </div>
  );
}

export default Recipe;
