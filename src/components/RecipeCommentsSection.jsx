import { useQuery } from "@tanstack/react-query";
import { useUser } from "../hooks/auth";
import { Link } from "react-router-dom";
import { fetchRecipeComments } from "../api/recipes";
import RecipeComment from "./RecipeComment";
import NewRatingForm from "./NewRatingForm";

export default function RecipeCommentsSection({ recipeName }) {
  const { data: user } = useUser();

  // Fetch comments from the API
  const { data, isPending, isError } = useQuery({
    queryKey: ["recipe", recipeName, "ratings"],
    queryFn: () => fetchRecipeComments(recipeName),
  });

  if (isPending) {
    return (
        <div className="card shadow-xl rounded-2xl bg-base-100">
          <div className="card-body">
            <h3 className="card-title">Commentaires</h3>
            <p>Chargement des commentaires...</p>
          </div>
        </div>
    );
  }

  if (isError) {
    return (
        <div className="card shadow-xl rounded-2xl bg-base-100">
          <div className="card-body">
            <h3 className="card-title">Commentaires</h3>
            <p>Une erreur est survenue lors du chargement des commentaires.</p>
          </div>
        </div>
    );
  }

  const renderNewComment = () => {
    if (!user) {
      return (
          <p className="text-gray-600 mx-4">
            <Link to="/login" className="link">
              Connectez vous
            </Link>{" "}
            pour pouvoir écrire un commentaire.
          </p>
      );
    }

    return !data.hasVoted ? (
        <NewRatingForm recipeName={recipeName} />
    ) : (
        <p className="text-gray-600 py-2 px-4">
          Vous avez déjà voté pour cette recette.
        </p>
    );
  };

  return (
      <div className="card shadow-xl rounded-2xl bg-base-100 mb-16">
        <div className="card-body">
          <h3 className="card-title">Commentaires</h3>

          <div className="flex flex-col">
            {renderNewComment()}
            <div role="separator" className="divider" />

            <div className="flex flex-col gap-2">
              {isPending && <p>Chargement des commentaires...</p>}

              {data.ratings?.length === 0 && (
                  <p className="text-gray-600 mx-4">
                    Aucun commentaire pour le moment.
                  </p>
              )}

              {data.ratings?.map((rating) => (
                  <RecipeComment
                      key={rating.id}
                      rating={rating}
                      recipeName={recipeName}
                  />
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
