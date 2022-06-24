import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NacionalityCard from '../components/NacionalityCard';
import RecipeCard from '../components/RecipeCard';

export default function ExploreFoodsNationalities() {
  return (
    <>
      <Header title="Explore Nationalities" />
      <NacionalityCard />
      <RecipeCard />
      <Footer />
    </>
  );
}
