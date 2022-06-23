import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExploreDrinks() {
  const history = useHistory();
  return (
    <>
      <Header title="Explore Drinks" search={ false } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
      </button>
      <button type="button" data-testid="explore-surprise">Surprise me!</button>
      <Footer />
    </>
  );
}
