import { useMutation, useQuery } from "@tanstack/react-query";
import { useUser } from "../hooks/auth";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { fetchRecipeComments, postRecipeComment } from "../api/recipes";
import { queryClient } from "../api/http";

export default function RecipeCommentsSection({ recipeName }) {
  const user = useUser();
  const { register, handleSubmit, reset } = useForm();
  // Fetch comments from the API
  const { data, isPending } = useQuery({
    queryKey: ["recipe", recipeName, "comments"],
    queryFn: () => fetchRecipeComments(recipeName),
  });

  const { mutateAsync: postComment, isPending: isPostingComment } = useMutation(
    {
      mutationFn: async (rating, comment) => {
        await postRecipeComment(recipeName, rating, comment);
        queryClient.invalidateQueries(["recipe", recipeName, "comments"]);
      },
    }
  );

  const onSubmitComment = async (data) => {
    await postComment(data.rating, data.comment);
    reset({});
  };

  const renderNewComment = () => {
    if (!user) {
      return (
        <p className="text-gray-600">
          <Link to="/login" className="link">
            Connectez vous
          </Link>{" "}
          pour pouvoir écrire un commentaire.
        </p>
      );
    }

    return (
      <div className="flex flex-col">
        <form onSubmit={handleSubmit(onSubmitComment)}>
          <label className="label label-text font-semibold" htmlFor="rating">
            Votre note
          </label>
          <div className="rating rating-half mr-2" id="rating">
            {[...Array(11)].map((_, index) => (
              <input
                key={index}
                type="radio"
                name="rating-10"
                className={classNames({
                  "rating-hidden": index === 0,
                  "bg-orange-400 mask-star-2": index > 0,
                  "mask-half-2": index % 2 === 0 && index > 0,
                  "mask-half-1": index % 2 !== 0,
                })}
                {...register("rating")}
                value={index / 2}
                defaultChecked={index == 5}
                disabled={isPostingComment}
              />
            ))}
          </div>

          <label className="label label-text font-semibold" htmlFor="comment">
            Votre commentaire
          </label>
          <textarea
            id="comment"
            className="textarea textarea-primary w-full"
            placeholder="Votre commentaire..."
            disabled={isPostingComment}
            {...register("comment")}
          ></textarea>

          <div className="flex justify-between items-center">
            <button
              className="btn btn-primary mt-2"
              disabled={isPostingComment}
            >
              Envoyer
            </button>
          </div>
        </form>

        <div role="separator" className="divider" />
      </div>
    );
  };

  return (
    <div className="card shadow-xl rounded-2xl bg-base-100">
      <div className="card-body">
        <h3 className="card-title">Commentaires</h3>

        {renderNewComment()}
      </div>
    </div>
  );
}
