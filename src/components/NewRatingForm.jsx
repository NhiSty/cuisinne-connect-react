import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { postRecipeRating } from "../api/recipes";
import { queryClient } from "../api/http";

export default function NewRatingForm({respondTo = null, children = undefined, recipeName}) {

    const { register, handleSubmit, reset, setValue, watch } = useForm({
        defaultValues: {
            rating: 5,
            comment: "",
        },
    });

    const { mutateAsync: postComment, isPending: isPostingComment } = useMutation(
        {
            mutationFn: async ({ rating, comment }) => {
                await postRecipeRating(recipeName, rating, comment);
                queryClient.invalidateQueries(["recipe", recipeName, "comments"]);
            },
        }
    );

    const onSubmitComment = async (data) => {
        await postComment(data);
        reset({});
    };

    return (
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
                        onChange={() => setValue("rating", index / 2)}
                        value={watch("rating") === index / 2}
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

            <div className="flex flex-row-reverse justify-start items-center gap-1 mt-2">
                <button className="btn btn-sm btn-primary" disabled={isPostingComment}>
                    Envoyer
                </button>
                {children}
            </div>
        </form>
    );
}
