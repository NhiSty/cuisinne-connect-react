import { useQuery } from "@tanstack/react-query";
import { getRecipeRating } from "../api/recipes";
import classNames from "classnames";

export default function RecipeStarsRating({ recipeName }) {
  const { data, isPending } = useQuery({
    queryKey: ["recipe", recipeName, "rating"],
    queryFn: () => getRecipeRating(recipeName),
  });

  if (isPending) {
    return <span className="loading loading-dots loading-sm"></span>;
  }

  if (!data?.rating) {
    return (
        <p className="text-gray-600 text-sm mx-auto mb-2">Pas encore évalué</p>
    );
  }

  return (
      <div className="flex flex-row items-center mx-auto">
        <div
            className="rating rating-half mr-2 tooltip tooltip-bottom"
            data-tip={`${data.rating}/5`}
        >
          {[...Array(11)].map((_, index) => (
              <input
                  key={index}
                  type="radio"
                  name="rating-10"
                  className={classNames({
                    "rating-hidden": index === 0,
                    "bg-orange-400 mask-star-2 starlg": index > 0,
                    "mask-half-2": index % 2 === 0 && index > 0,
                    "mask-half-1": index % 2 !== 0,
                  })}
                  checked={data.rating == index / 2}
                  disabled={true}
              />
          ))}
        </div>
      </div>
  );
}
