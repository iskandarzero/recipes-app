import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { categoryApi, fetchByCategory } from '../services/categoryApi';
import { RecipesContext } from '../context/RecipesContext';

function FilterButtons({ page }) {
  const [categoryArr, setCategoryArr] = useState([]);
  const [toggleFilter, setToggleFilter] = useState();
  const { setSearchResults } = useContext(RecipesContext);
  const maxCatgory = 5;
  useEffect(() => {
    async function fetchCategory() {
      const recipeCategory = await categoryApi(page);
      setCategoryArr(recipeCategory.slice(0, maxCatgory));
    }
    fetchCategory();
  }, []);
  useEffect(() => {
    if (categoryArr.length > 0) {
      setToggleFilter({
        [categoryArr[0].strCategory]: false,
        [categoryArr[1].strCategory]: false,
        [categoryArr[2].strCategory]: false,
        [categoryArr[3].strCategory]: false,
        [categoryArr[4].strCategory]: false,
      });
    }
  }, [categoryArr]);

  const handleClick = async ({ value }) => {
    setToggleFilter((prevState) => ({
      ...toggleFilter,
      [value]: !prevState.value,
    }));
    setSearchResults(
      await fetchByCategory(page, value),
    );
  };
  console.log(toggleFilter);

  return categoryArr.length > 0 && (
    <div>
      {categoryArr.map((category, i) => (
        <button
          data-testid={ `${category.strCategory}-category-filter` }
          type="button"
          key={ i }
          value={ category.strCategory }
          onClick={ ({ target }) => handleClick(target) }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

FilterButtons.propTypes = {
  page: PropTypes.string.isRequired,
};

export default FilterButtons;
