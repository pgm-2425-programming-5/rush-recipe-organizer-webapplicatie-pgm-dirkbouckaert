'use client';

import { Recipe } from '@/lib/validation';
import { useEffect, useState } from 'react';
import { getAllRecipes } from './actions';
import BtnAdd from '@/components/common/BtnAdd';
import Spinner from '@/components/common/Spinner';
import Badge from '@/components/common/Badge';

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
            <div
              key={index}
              className="relative my-6 rounded-lg bg-slate-100 p-6 shadow-lg"
            >
              <h2 className="text-3xl font-bold">{recipe.name}</h2>
              <ul className="my-4">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>• {ingredient}</li>
                ))}
              </ul>
              <p>{recipe.instructions}</p>
              <Badge
                title={recipe.category}
                className="absolute right-2 top-2"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
