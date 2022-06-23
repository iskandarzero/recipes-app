import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import blackHeart from '../images/blackHeartIcon.svg';

function UnfavoriteBtn({ id, reload, index }) {
  const [favorite, setFavorite] = useState(true);

  useEffect(() => {
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipes && id) {
      setFavorite(JSON.parse(favoriteRecipes)
        .map((favRecipe) => favRecipe.id)
        .includes(id));
    }
  }, [id]);

  function deleteFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = favoriteRecipes
      .filter((favRecipe) => favRecipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavorite(false);
    reload((prev) => !prev);
  }

  return (
    <div>
      {favorite && (
        <button
          data-testid={ `${index}-horizontal-favorite-btn` }
          type="button"
          src={ blackHeart }
          onClick={ deleteFavorite }
        >
          <img src={ blackHeart } alt="black heart icon" />
        </button>
      )}
    </div>
  );
}

export default UnfavoriteBtn;

UnfavoriteBtn.propTypes = {
  id: PropTypes.string.isRequired,
  reload: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
};
