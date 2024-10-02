import { STORAGE_KEY } from '@/lib/consts';
import { Recipe, recipeSchema } from '@/lib/validation';

/**
 * Gets all recipes from local storage
 * @returns An array of recipes
 */
export const getAllRecipes = (): Recipe[] | null => {
  const storedRecipes = localStorage.getItem(STORAGE_KEY);
  if (!storedRecipes) return null;
  return JSON.parse(storedRecipes);
};

/**
 * Add a recipe to local storage
 * @param recipe The recipe to add
 * @returns The new array of recipes
 */
export const addRecipe = (recipe: Recipe): Recipe[] | null => {
  // Validate
  const { error } = recipeSchema.safeParse(recipe);
  if (error) {
    console.log('error:', error);
    return null;
  }

  // Add
  try {
    const recipes = getAllRecipes() || [];
    recipes.push(recipe);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    return recipes;
  } catch (error) {
    console.log('error:', error);
    return null;
  }
};
