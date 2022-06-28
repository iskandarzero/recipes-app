import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
// import PropTypes from 'prop-types';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [recipesFilted, setRecipesFilter] = useState(doneRecipes);
  const [copySucess, setCopySucess] = useState(false);
  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    setRecipesFilter(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  const filterRecipes = (type) => {
    if (type === 'all') return setRecipesFilter(doneRecipes);
    setRecipesFilter(doneRecipes.filter((recipe) => recipe.type === type));
  };

  function copiarTexto(type, id) {
    const timeout = 900;
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setCopySucess(true);
    setTimeout(() => {
      setCopySucess(false);
    }, timeout);
  }

  return (
    <>
      <header>
        <Header title="Done Recipes" search={ false } />
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterRecipes('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipes('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('drink') }
        >
          Drinks
        </button>
      </header>
      <main>
        {recipesFilted && recipesFilted
          .map((recipe, index) => (
            <div key={ index }>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                />
              </Link>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
              </Link>
              { recipe.alcoholicOrNot.length !== 0 && (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.alcoholicOrNot}
                </p>)}
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.nationality ? `${recipe.nationality} - ` : ''}
                {recipe.category}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>
                {`Done date: ${recipe.doneDate}`}
              </p>
              <button
                id="share-btn"
                type="button"
                src={ shareIcon }
                onClick={ () => copiarTexto(recipe.type, recipe.id) }
                data-testid={ `${index}-horizontal-share-btn` }
              >
                <img
                  src={ shareIcon }
                  alt={ recipe.name }
                />
              </button>
              {copySucess && <p>Link copied!</p>}
              {
                recipe.tags.length > 0 && recipe.tags
                  .map((tag, i) => (
                    <p
                      key={ i }
                      data-testid={ `${'0'}-${recipe.tags[i]}-horizontal-tag` }
                    >
                      {recipe.tags[i]}
                    </p>
                  ))
              }
            </div>
          ))}
      </main>
    </>
  );
}

// DoneRecipes.propTypes = {}

export default DoneRecipes;
