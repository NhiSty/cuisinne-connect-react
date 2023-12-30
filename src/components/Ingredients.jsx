import { useQuery } from "@tanstack/react-query";
import { getRecipeIngredients } from "../api/recipes";

export default function Ingredient({ recipeName }) {
  const { isPending, data: ingredients } = useQuery({
    queryKey: ["recipe", recipeName, "ingredients"],
    queryFn: () => getRecipeIngredients(recipeName),
  });

  if (isPending) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (!ingredients) {
    return <p>Les ingrédients n'ont pas été précisé sur cette recette</p>;
  }

  return (
    <div className={"flex flex-col justify-start items-start mx-4"}>
      <ul className="list-disc">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name}</li>
        ))}
      </ul>
    </div>
  );
}
