import { useState } from "react";
import { useParams } from "react-router-dom";
import RecipeStarsRating from "../components/RecipeStarsRating.jsx";
import Instructions from "../components/InstructionStep.jsx";
import Ingredient from "../components/Ingredients.jsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecipe } from "../api/recipes.js";
import {
  CookingPot,
  Flame,
  User,
  Users,
  RotateCw,
  ShoppingBag,
} from "lucide-react";
import SimilarRecipes from "../components/SimilarRecipes.jsx";
import RecipeSideDish from "../components/RecipeSideDish.jsx";
import RecipeCourseList from "../components/RecipeCourseList.jsx";
import RecipeCommentsSection from "../components/RecipeCommentsSection.jsx";

export default function Recipe() {
  const [isSimilarRecipesLoading, setIsSimilarRecipesLoading] = useState(false);

  const [isSideDishLoading, setIsSideDishLoading] = useState(false);

  const { recipeName } = useParams();

  const queryClient = useQueryClient();

  const generateOtherRecommandations = async () => {
    setIsSimilarRecipesLoading(true);

    try {
      await queryClient.invalidateQueries(["recipe", recipeName, "similar"]);
    } finally {
      setIsSimilarRecipesLoading(false);
    }
  };

  const generateOtherSideDish = async () => {
    setIsSideDishLoading(true);

    try {
      await queryClient.invalidateQueries(["recipe", recipeName, "sideDish"]);
    } finally {
      setIsSideDishLoading(false);
    }
  };

  const {
    data: recipe,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["recipe", recipeName],
    queryFn: () => getRecipe(recipeName),
    retry: 0,
  });

  if (isPending) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <span className="text-2xl">{error.message}</span>
      </div>
    );
  }

  return (
    <div className="m-8">
      <header className="mb-10">
        <h2 className="text-2xl mb-4 flex flex-wrap gap-4 items-center">
          {recipe.title}
        </h2>
      </header>

      <div className="flex flex-col lg:flex-row-reverse gap-8 w-full">
        <aside className="lg:w-96">
          <div className="w-full lg:sticky lg:top-10 flex flex-col gap-4">
            <div className="card shadow-xl rounded-2xl bg-base-100 w-full">
              <div className="card-body">
                <h3 className="card-title">Informations</h3>

                <RecipeStarsRating recipeName={recipe.title} />

                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="badge badge-accent h-8 group">
                    <CookingPot className="mr-2 w-5 h-5 group-hover:animate-shake" />
                    {recipe.cookingTime} minutes
                  </span>

                  <span className="badge badge-accent h-8">
                    <Users className="mr-2 w-5 h-5" />
                    {recipe.servings} personnes
                  </span>

                  <span className="badge badge-accent h-8">
                    <User className="mr-2 w-5 h-5" />
                    <span>
                      By{" "}
                      <span className="italic">
                        {recipe.author?.username || "Anomyne"}
                      </span>
                    </span>
                  </span>

                  <RecipeCourseList recipeName={recipe.title} />

                </div>
              </div>
            </div>

            <div className="card shadow-xl rounded-2xl bg-base-100 w-full">
              <div className="card-body">
                <h3 className="card-title">Ingrédients</h3>
                <Ingredient recipeName={recipe.title} />
              </div>
            </div>

            {/* Accompagnements recommandés */}
            <div className="card shadow-xl rounded-2xl bg-base-100 w-full">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="card-title">Accompagnement possibles</h3>
                  <button onClick={() => generateOtherSideDish()}>
                    <RotateCw size={20} />
                  </button>
                </div>
                {isSideDishLoading ? (
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <span className="loading loading-dots loading-lg"></span>
                  </div>
                ) : (
                  <RecipeSideDish recipeName={recipe.title} />
                )}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col gap-6">
          <article className="card shadow-xl rounded-2xl bg-base-100">
            <div className="card-body">
              <h3 className="card-title text-3xl">Instructions</h3>
              <Instructions instructions={recipe.instructions} />
            </div>
          </article>

          {/* Recommandations similaires */}
          <div className="card shadow-xl rounded-2xl bg-base-100 w-full">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h3 className="card-title">Recommandations</h3>
                <button onClick={() => generateOtherRecommandations()}>
                  <RotateCw size={20} />
                </button>
              </div>
              {isSimilarRecipesLoading ? (
                <div className="flex-1 flex flex-col justify-center items-center">
                  <span className="loading loading-dots loading-lg"></span>
                </div>
              ) : (
                <SimilarRecipes recipeName={recipe.title} />
              )}
            </div>
          </div>

          {/* Commentaires */}
          <RecipeCommentsSection recipeName={recipe.title} />
        </main>
      </div>
    </div>
  );
}
