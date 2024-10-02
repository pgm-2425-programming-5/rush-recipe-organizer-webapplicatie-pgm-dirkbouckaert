import { z } from 'zod';

// Recipe input
export const recipeInputSchema = z.object({
  name: z.string().min(1, 'Vul een naam in'),
  category: z.string().min(1, 'Duid een categorie aan'),
  ingredients: z.string().min(1, 'Vul de ingrediënten in'),
  instructions: z.string().min(1, 'Voeg de instructies toe'),
});

export type RecipeInput = z.infer<typeof recipeInputSchema>;

// Recipe
export const recipeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Vul een naam in'),
  category: z.string().min(1, 'Duid een categorie aan'),
  ingredients: z.array(z.string()).min(1, 'Vul de ingrediënten in'),
  instructions: z.string().min(1, 'Voeg de instructies toe'),
});

export type Recipe = z.infer<typeof recipeSchema>;
