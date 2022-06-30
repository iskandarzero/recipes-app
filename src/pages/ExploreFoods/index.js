import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './styles.scss';

export default function ExploreFoods() {
  const history = useHistory();

  const randomMeal = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();

    history.push(`/foods/${data.meals[0].idMeal}`);
  };

  return (
    <div id="explore-foods">
      <Header title="Explore Foods" search={ false } />
      <section>
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
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ randomMeal }
        >
          Surprise me!
        </button>
      </section>
      <Footer />
    </div>
  );
}
