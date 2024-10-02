'use client';

import { Recipe } from '@/lib/validation';
import { useEffect, useState } from 'react';
import { deleteRecipe, getAllRecipes } from './actions';
import BtnAdd from '@/components/common/BtnAdd';
import Spinner from '@/components/common/Spinner';
import Badge from '@/components/common/Badge';
import { FaTrashCan } from 'react-icons/fa6';

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
            <div
              key={index}
              className="relative my-6 rounded-lg bg-slate-100 p-6 shadow-lg"
            >
              <h2 className="mt-2 text-3xl font-bold">{recipe.name}</h2>
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
              <FaTrashCan
                onClick={() => handleDelete(recipe.id as string)}
                className="absolute bottom-2 right-2 h-5 w-5 cursor-pointer text-red-500 transition hover:scale-110 hover:text-red-600"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
