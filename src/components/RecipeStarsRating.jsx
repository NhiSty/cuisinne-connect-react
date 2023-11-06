import useSWR from "swr";

export default function RecipeStarsRating({ recipeId }) {
    const { data: rating, isLoading } = useSWR(`/api/recipes/${recipeId}/rating`, fetcher);

    if (isLoading) {
        return <span className="loading loading-dots loading-sm"></span>
    }

    if (!rating) {
        return <p>Pas encore évalué</p>
    }

    const checkStar = (starIndex) => {
        return rating >= starIndex;

    }

    return (
        <div className={'flex flex-row items-center'}>
            <div className="rating rating-sm rating-half mr-2">
                <input type="radio" name="rating-10" className="rating-hidden" />
                <input type="radio" name="rating-10" className="bg-gray-800 mask mask-star-2 mask-half-1" checked={checkStar(0.1)}/>
                <input type="radio" name="rating-10" className="bg-gray-800 mask mask-star-2 mask-half-2" checked={checkStar(1)} />
                <input type="radio" name="rating-10" className="bg-gray-800 mask mask-star-2 mask-half-1" checked={checkStar(1.1)} />
                <input type="radio" name="rating-10" className="bg-gray-800 mask mask-star-2 mask-half-2" checked={checkStar(2)}/>
                <input type="radio" name="rating-10" className="bg-gray-800 mask mask-star-2 mask-half-1" checked={checkStar(2.1)}/>
                <input type="radio" name="rating-10" className="bg-gray-800 mask mask-star-2 mask-half-2" checked={checkStar(3)}/>
                <input type="radio" name="rating-10" className="bg-gray-800 mask mask-star-2 mask-half-1" checked={checkStar(3.1)}/>
                <input type="radio" name="rating-10" className="bg-gray-800 mask mask-star-2 mask-half-2" checked={checkStar(4)}/>
                <input type="radio" name="rating-10" className="bg-gray-800 mask mask-star-2 mask-half-1" checked={checkStar(4.1)}/>
                <input type="radio" name="rating-10" className="bg-gray-800 mask mask-star-2 mask-half-2" checked={checkStar(5)}/>
            </div>
            <p>{rating}/5</p>
        </div>
    )
}


function fetcher(url) {
    return fetch(`http://localhost:3000${url}`).then((r) => r.json());
}
