import React, { useContext } from 'react';
import { RecipesContext } from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  const { searchResults } = useContext(RecipesContext);
  let filteredRecipes = [];
  const maxRecipes = 12;
  if (searchResults.length > 1) {
    filteredRecipes = searchResults.slice(0, maxRecipes);
  }

  return (
    <div>
      <Header title="Drinks" />
      <main>
        {filteredRecipes.map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ index }>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
            />
            <h3 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h3>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default Drinks;
