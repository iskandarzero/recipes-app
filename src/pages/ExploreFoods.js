import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ExploreFoods() {
  const history = useHistory();
  return (
    <>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        type="button"
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality

      </button>
      <button type="button" data-testid="explore-surprise">Surprise me!</button>
    </>
  );
}
