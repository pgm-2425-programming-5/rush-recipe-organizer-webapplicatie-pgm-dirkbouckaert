import { STORAGE_KEY } from '@/lib/consts';
import { Recipe, recipeSchema } from '@/lib/validation';
import { v4 as uuidv4 } from 'uuid';

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

  // Add id to new recipe
  recipe.id = uuidv4();

  // Add recipe to local storage
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

/**
 * Delete a recipe from local storage
 * @param id The id of the recipe to delete
 * @returns The new array of recipes
 */
export const deleteRecipe = (id: string): Recipe[] | null => {
  try {
    const recipes = getAllRecipes();
    if (!recipes) return null;
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
    return updatedRecipes;
  } catch (error) {
    console.log('error:', error);
    return null;
  }
};
