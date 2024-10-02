'use client';

import BtnGoBack from '@/components/common/BtnGoBack';
import { CATEGORIES } from '@/lib/consts';
import { Recipe } from '@/lib/validation';
import { cn } from '@/lib/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { recipeInputSchema } from '@/lib/validation';
import { addRecipe } from '../actions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type Inputs = Omit<Recipe, 'id' | 'ingredients'> & {
  ingredients: string;
};

const AddRecipePage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(recipeInputSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newRecipe: Recipe = {
      ...data,
      ingredients: data.ingredients.split(','),
    };

    const updatedRecipes = addRecipe(newRecipe);
    if (updatedRecipes) router.push('/recipes');
    else toast.error('Er is iets fout gegaan');
  };

  return (
    <div className="form-container">
      <BtnGoBack href="/recipes" className="mb-6" />

      <h1 className="text-center text-3xl">Voeg een recept toe</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className={cn('form-label', errors.name && 'text-red-500')}
          >
            Naam
          </label>
          <input
            type="text"
            id="name"
            className="input"
            {...register('name')}
            autoFocus
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className={cn('form-label', errors.category && 'text-red-500')}
          >
            Categorie
          </label>
          <select id="category" className="input" {...register('category')}>
            <option value="">Kies een categorie</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="form-error">{errors.category.message}</p>
          )}
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label
            htmlFor="ingredients"
            className={cn('form-label', errors.ingredients && 'text-red-500')}
          >
            Ingrediënten
          </label>
          <div className="form-text">
            Scheid de verschillende Ingrediënten met een komma
          </div>
          <textarea
            id="ingredients"
            className="input"
            {...register('ingredients')}
          ></textarea>
          {errors.ingredients && (
            <p className="form-error">{errors.ingredients.message}</p>
          )}
        </div>

        {/* Instructions */}
        <div className="mb-4">
          <label
            htmlFor="instructions"
            className={cn('form-label', errors.instructions && 'text-red-500')}
          >
            Instructies
          </label>
          <textarea
            id="instructions"
            className="input"
            {...register('instructions')}
          ></textarea>
          {errors.instructions && (
            <p className="form-error">{errors.instructions.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="mt-8 flex justify-start">
          <button type="submit" className="btn">
            Voeg toe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipePage;
