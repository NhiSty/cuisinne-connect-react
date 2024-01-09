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
            className="rating mr-2 tooltip tooltip-bottom"
            data-tip={`${data.rating}/5`}
          >
            {[...Array(5)].map((_, index) => (
              <input
                key={index}
                type="radio"
                name="rating-5"
                className={classNames("mask bg-orange-400 mask-star-2")}
                checked={data.rating == index+1}
                disabled={true}
              />
            ))}
          </div>
      </div>
    );
}
