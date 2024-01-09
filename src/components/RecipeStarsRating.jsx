import { getRecipeRating } from "../api/recipes.js";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";

export default function RecipeStarsRating({ recipeName }) {
  const { data: rating, isPending, isLoading } = useQuery({
    queryKey: ["recipe", recipeName, "rating"],
    queryFn: () => getRecipeRating(recipeName),
  });

  if (isPending || isLoading) {
    return <span className="loading loading-dots loading-sm"></span>;
  }

  if (!rating?.rating) {
    return (
      <p className="text-gray-600 text-sm mx-auto mb-2">Pas encore évalué</p>
    );
  }

  return (
    <div className="flex flex-row items-center mx-auto">
      <div
        className="rating mr-2 tooltip tooltip-bottom"
        data-tip={`${rating.rating}/5`}
      >
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            type="radio"
            name="recipe-rating"
            className={classNames({ "rating-hidden": index === 0, "bg-orange-400 mask mask-star-2": index > 0 })}
            checked={rating.rating === index}
            disabled={true}
          />
        ))}
      </div>
    </div>
  );
}

