'use client';

import { useEffect, useState } from 'react';
import { CATEGORIES } from '@/lib/consts';
import { deleteRecipe, getAllRecipes } from './actions';

// Types
import { Recipe } from '@/lib/validation';

// Components & Icons
import BtnAdd from '@/components/common/BtnAdd';
import Spinner from '@/components/common/Spinner';
import RecipeCard from '@/components/recipes/RecipeCard';
import Badge from '@/components/common/Badge';
import { FaFilter, FaFilterCircleXmark } from 'react-icons/fa6';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('test');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[] | null>();

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

  const handleSelectCategory = (title: string) => {
    setSelectedCategory(title);
    setFilteredRecipes(recipes.filter((recipe) => recipe.category === title));
  };

  const handleRemoveFilter = () => {
    setSelectedCategory('');
    setFilteredRecipes(null);
  };

  const handleDelete = (id: string) => {
    const updatedRecipes = deleteRecipe(id);
    if (updatedRecipes) {
      setRecipes(updatedRecipes);
      setFilteredRecipes(null);
      setSelectedCategory('');
    } else setError('Er is iets fout gegaan');
  };

  return (
    <div className="app-container">
      {/* Subheader */}
      <section className="mb-6 flex items-start justify-between gap-6">
        {/* Filters */}
        <div className="flex gap-3">
          {!loading && recipes.length > 0 && (
            <>
              {selectedCategory ? (
                <FaFilterCircleXmark
                  className="h-6 w-6 min-w-6 cursor-pointer text-emerald-500"
                  onClick={handleRemoveFilter}
                />
              ) : (
                <FaFilter className="h-6 w-6 min-w-6 text-slate-500" />
              )}
              <div className="flex flex-wrap gap-4">
                {CATEGORIES.map((category, index) => (
                  <Badge
                    key={index}
                    title={category}
                    className="cursor-pointer transition hover:scale-y-110 hover:shadow-lg"
                    onClick={handleSelectCategory}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        {/* Add button */}
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
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filteredRecipes
            ? filteredRecipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  recipe={recipe}
                  handleDelete={handleDelete}
                />
              ))
            : recipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  recipe={recipe}
                  handleDelete={handleDelete}
                />
              ))}
        </section>
      )}
    </div>
  );
};

export default RecipesPage;
