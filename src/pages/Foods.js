import React from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import Footer from '../components/Footer';

function Foods() {
  return (
    <div>
      <Header title="Foods" />
      <RecipeCard />
      <Footer />
    </div>
  );
}

export default Foods;
