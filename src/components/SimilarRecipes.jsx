import { useQuery } from "@tanstack/react-query";
import { fetchSimilarRecipes } from "../api/recipes";

export default function SimilarRecipes({ recipeName }) {
  const { data, isPending } = useQuery({
    queryKey: ["recipe", recipeName, "similar"],
    queryFn: () => fetchSimilarRecipes(recipeName),
  });

  if (isPending) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (!data?.recipes) {
    return (
      <p className="text-gray-600 text-sm mx-auto mb-2">
        Pas de recettes similaires
      </p>
    );
  }

  return (
    <ul className="flex flex-col list-disc mx-8">
      {data.recipes.map((recipe, index) => (
        <li key={index}>
          <a
            href={`/recipe/${recipe}`}
            className="link link-hover link-primary"
          >
            {recipe}
          </a>
        </li>
      ))}
    </ul>
  );
}
