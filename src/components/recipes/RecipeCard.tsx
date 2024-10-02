import { Recipe } from '@/lib/validation';
import Badge from '../common/Badge';
import { FaTrashCan } from 'react-icons/fa6';

type RecipeCardProps = {
  recipe: Recipe;
  handleDelete: (id: string) => void;
};

const RecipeCard = ({ recipe, handleDelete }: RecipeCardProps) => {
  return (
    <div className="relative my-6 rounded-lg bg-slate-100 p-6 shadow-lg">
      <h2 className="mt-2 text-3xl font-bold">{recipe.name}</h2>
      <ul className="my-4">
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient}>• {ingredient}</li>
        ))}
      </ul>
      <p>{recipe.instructions}</p>
      <Badge title={recipe.category} className="absolute right-2 top-2" />
      <FaTrashCan
        onClick={() => handleDelete(recipe.id as string)}
        className="absolute bottom-2 right-2 h-5 w-5 cursor-pointer text-red-500 transition hover:scale-110 hover:text-red-600"
      />
    </div>
  );
};

export default RecipeCard;
