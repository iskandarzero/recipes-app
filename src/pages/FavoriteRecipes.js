import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import UnfavoriteBtn from '../components/UnfavoriteBtn';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recipesFilter, setRecipesFilter] = useState(favoriteRecipes);
  const [copySucess, setCopySucess] = useState(false);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    setRecipesFilter(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, [reload]);

  const filterRecipes = (type) => {
    if (type === 'all') return setRecipesFilter(favoriteRecipes);
    setRecipesFilter(favoriteRecipes.filter((recipe) => recipe.type === type));
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
    <div>
      <Header title="Receitas Favoritas" search={ false } />
      <header>
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
        {recipesFilter && recipesFilter
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
                  alcoholic or not:
                  {recipe.alcoholicOrNot}
                </p>)}
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.nationality !== '' && `${recipe.nationality} - `}
                {recipe.category}
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
              <UnfavoriteBtn id={ recipe.id } reload={ setReload } index={ index } />
            </div>
          ))}
      </main>
    </div>
  );
}

export default FavoriteRecipes;
