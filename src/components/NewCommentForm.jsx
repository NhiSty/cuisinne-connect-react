import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { postCommentResponse } from "../api/recipes";
import { queryClient } from "../api/http";

export default function NewCommentForm({recipeName, children = undefined, respondTo, onSubmit,}) {

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            comment: "",
        },
    });

    const { mutateAsync: postComment, isPending: isPostingComment } = useMutation(
        {
            mutationFn: async ({ comment }) => {
                await postCommentResponse(recipeName, respondTo, comment);
                queryClient.invalidateQueries([
                    "recipe",
                    recipeName,
                    "comments",
                    respondTo,
                ]);
                onSubmit?.();
            },
        }
    );

    const onSubmitComment = async (data) => {
        await postComment(data);
        reset({});
    };

    return (
        <form onSubmit={handleSubmit(onSubmitComment)}>
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
                    Répondre
                </button>
                {children}
            </div>
        </form>
    );
}
