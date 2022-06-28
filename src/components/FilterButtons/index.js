import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { categoryApi, fetchByCategory } from '../../services/categoryApi';
import { RecipesContext } from '../../context/RecipesContext';
import './styles.scss';

function FilterButtons({ page }) {
  const [categoryArr, setCategoryArr] = useState([]);
  const [toggleFilter, setToggleFilter] = useState();
  const { setFilteredResults } = useContext(RecipesContext);
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

  const handleClick = async ({ value }, teste) => {
    if (toggleFilter[value]) {
      setFilteredResults([]);
    } else {
      setFilteredResults(
        await fetchByCategory(page, value),
      );
    }

    setToggleFilter({ ...toggleFilter, [value]: teste });
  };

  return categoryArr.length > 0 && (
    <div id="filter-grid">
      {categoryArr.map((category, i) => (
        <button
          className="filter-button"
          data-testid={ `${category.strCategory}-category-filter` }
          type="button"
          key={ i }
          value={ category.strCategory }
          onClick={ ({ target }) => handleClick(target, !toggleFilter[target.value]) }
        >
          {category.strCategory}
        </button>
      ))}
      <button
        className="filter-button"
        data-testid="All-category-filter"
        type="button"
        onClick={ () => setFilteredResults([]) }
      >
        All
      </button>
    </div>
  );
}

FilterButtons.propTypes = {
  page: PropTypes.string.isRequired,
};

export default FilterButtons;
