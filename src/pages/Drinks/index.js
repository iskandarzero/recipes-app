import React, { useEffect, useContext } from 'react';
import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';
import Footer from '../../components/Footer';
import { RecipesContext } from '../../context/RecipesContext';
import { drinkApi } from '../../services/foodAndDrinkApi';
import FilterButtons from '../../components/FilterButtons';

function Drinks() {
  const { setSearchResults } = useContext(RecipesContext);
  useEffect(() => {
    async function fetchRecipes() {
      setSearchResults(await drinkApi('s', ''));
    }
    fetchRecipes();
  }, []);

  return (
    <div>
      <Header title="Drinks" />
      <FilterButtons page="drinks" />
      <RecipeCard />
      <Footer />
    </div>
  );
}

export default Drinks;
