import classNames from "classnames";
import { useState } from "react";
import NewCommentForm from "./NewCommentForm";
import { useQuery } from "@tanstack/react-query";
import { fetchCommentResponses } from "../api/recipes";
import { useUser } from "../hooks/auth";

export default function RecipeComment({ recipeName, rating }) {
    const { data: user } = useUser();
    const [showRespondForm, setShowRespondForm] = useState(false);
    const [showChildrenComments, setShowChildrenComments] = useState(false);

    if (!rating) {
        return <p>Impossible de charger le commentaire.</p>;
    }

    // Load children comments
    const {
        data: childrenComments,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["recipe", recipeName, "comments", rating.commentId],
        queryFn: () => fetchCommentResponses(recipeName, rating.commentId),
        enabled: showChildrenComments,
    });

    const renderStars = () => {
        return (
          <div className="flex flex-row items-center">
              <div
                className="rating rating-sm tooltip tooltip-bottom"
                data-tip={`${rating.rating}/5`}
              >
                {[...Array(5)].map((_, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="rating-5"
                    className="cursor-default bg-orange-400 mask mask-star-2"
                    defaultChecked={rating.rating == index+1}
                    disabled={true}
                  />
                ))}
              </div>
          </div>
        );
    };

    const formatDate = (date) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(date).toLocaleDateString("fr-FR", options);
    };

    const renderCommentReponsesForm = () => {
        if (!showRespondForm) {
            return (
              <div className="flex flex-row justify-end gap-1">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setShowChildrenComments((old) => !old)}
                  >
                      {showChildrenComments
                        ? "Masquer les réponses"
                        : "Afficher les réponses"}
                  </button>

                  {user && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setShowRespondForm(true)}
                    >
                        Répondre
                    </button>
                  )}
              </div>
            );
        }

        return (
          <>
              <div className="divider"></div>
              <div className="flex flex-col mx-4">
                  <NewCommentForm
                    respondTo={rating.commentId}
                    recipeName={recipeName}
                    onSubmit={() => {
                        setShowRespondForm(false);
                    }}
                  >
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setShowRespondForm(false)}
                      >
                          Annuler
                      </button>
                  </NewCommentForm>
              </div>
          </>
        );
    };

    const renderResponses = () => {
        if (isPending) {
            return <p>Chargement des réponses...</p>;
        }

        if (isError) {
            return <p>Impossible de charger les réponses.</p>;
        }

        if (!childrenComments || childrenComments.length === 0) {
            return (
              <p className="text-gray-600 mx-4">Aucune réponse pour le moment.</p>
            );
        }

        return (
          <div className="flex flex-col gap-2 pl-4 ml-4 border-l-2 border-gray-400">
              {childrenComments.map((response) => (
                <div key={response.id}>
                    <div className="flex flex-row justify-between">
              <span className="text-gray-600 font-semibold">
                {response.user.username} - {formatDate(response.createdAt)}{" "}
              </span>
                    </div>
                    <p className="text-gray-800 px-2 py-1">{response.content}</p>
                </div>
              ))}
          </div>
        );
    };

    return (
      <div key={rating.id} className="bg-gray-100 p-4 rounded-lg">
          <div className="flex flex-row justify-between">
        <span className="text-gray-600 font-semibold">
          {rating.user.username} - {formatDate(rating.createdAt)}{" "}
        </span>

              {renderStars()}
          </div>
          <p className="text-gray-800 px-2 py-1">{rating.comment.content}</p>
          {renderCommentReponsesForm()}
          {showChildrenComments && renderResponses()}
      </div>
    );
}
