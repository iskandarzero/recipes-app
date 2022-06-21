import React from 'react';
import { useLocation } from 'react-router-dom';
import FoodDetail from '../components/FoodDetail';
import DrinkDetail from '../components/DrinkDetail';

function Recipe() {
  const { pathname } = useLocation();
  const isDrink = pathname.includes('drinks');
  const isFood = pathname.includes('foods');
  const id = pathname.split('/').pop();

  return (
    <div>
      {isFood && <FoodDetail id={ id } />}
      {isDrink && <DrinkDetail id={ id } />}
    </div>
  );
}

export default Recipe;
