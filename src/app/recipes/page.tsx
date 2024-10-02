'use client';

import { Recipe } from '@/lib/validation';
import { useEffect, useState } from 'react';
import { deleteRecipe, getAllRecipes } from './actions';
import BtnAdd from '@/components/common/BtnAdd';
import Spinner from '@/components/common/Spinner';
import RecipeCard from '@/components/recipes/RecipeCard';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const recipes = getAllRecipes();
      if (recipes) setRecipes(recipes);
    } catch (error) {
      console.log('error:', error);
      setError('Er is iets fout gegaan');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = (id: string) => {
    const updatedRecipes = deleteRecipe(id);
    if (updatedRecipes) setRecipes(updatedRecipes);
    else setError('Er is iets fout gegaan');
  };

  return (
    <div className="app-container">
      <section className="mb-6 flex items-center justify-end">
        <BtnAdd href="/recipes/add" title="Voeg jouw recept toe" />
      </section>

      {error && <p className="text-center text-3xl">{error}</p>}

      {loading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}

      {!loading && recipes.length === 0 && (
        <p className="text-center text-3xl">
          Je hebt nog geen recepten toegevoegd.
        </p>
      )}

      {!loading && recipes.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
