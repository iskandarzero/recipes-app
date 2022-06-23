import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ExploreDrinks() {
  const history = useHistory();
  return (
    <>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
      </button>
      <button type="button" data-testid="explore-surprise">Surprise me!</button>
    </>
  );
}
