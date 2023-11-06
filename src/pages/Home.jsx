import React from 'react';
import '../styles/HomeStyle.css';
import useSWRInfinite from "swr/infinite";
import RecipeCard from "../components/RecipeCard.jsx";

export default function Home() {
    const [page, setPage] = React.useState(1);
    const { data, isLoading } = useSWRInfinite(() => getKey(page), fetcher, { parallel: true });
    const result = !isLoading && data[0] || undefined;
    const recipes = result?.items || [];
    const totalRecipes = result?.itemsAvailable || 0;
    const itemsOffset = result?.itemsOffset || 0;
    const nextPageAvailable = itemsOffset + recipes.length < totalRecipes;
    const prevPageAvailable = page > 1;

    const nextPage = () => {
        if (nextPageAvailable)
        setPage(page + 1);
    }

    const prevPage = () => {
        if (prevPageAvailable)
        setPage(page - 1);
    }

    return (
        <>
            <div className="content-list-recipe bg-white shadow-sm">
                {
                    recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                        />
                    ))
                }
            </div>

            <div className="join mt-4">
                <button
                    disabled={!prevPageAvailable}
                    className="join-item btn bg-white"
                    onClick={prevPage}
                >
                    «
                </button>
                <button className="join-item btn bg-white">Page {page}</button>
                <button
                    disabled={!nextPageAvailable}
                    className="join-item btn bg-white"
                    onClick={nextPage}
                >
                    »
                </button>
            </div>
        </>
    );
}

function fetcher(url) {
    return fetch(`http://localhost:3000/api/${url}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

const getKey = (pageIndex, previousPageData) => {
    return `recipes?page=${pageIndex}&pageSize=12`
}
