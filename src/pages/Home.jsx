import { keepPreviousData, useQuery } from "@tanstack/react-query";
import RecipeCard from "../components/RecipeCard.jsx";
import { getLastRecipe, getRecipes } from "../api/recipes.js";
import SeasonRecommandation from "../components/sidebar/SeasonRecommandations.jsx";
import { useSearchParams } from "react-router-dom";
import SearchByCalorie from "../components/sidebar/SearchByCalorie.jsx";
import {useState} from "react";
import {RecipesByCaloriesProvider, useRecipesByCaloriesContext} from "../components/RecipesByCaloriesContext.jsx";

function PageContentRecipes() {
    const [searchParams] = useSearchParams();

    const searchText = searchParams.get("search") || null
    const isSearching = searchText?.length > 0;

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["recipes", searchText],
        queryFn: () => getRecipes(searchText),
        retry: 0,
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: searchText?.length > 0,
    });

    const { data: lastRecipe, isPending: isLastFetchPending } = useQuery({
        queryKey: ["get-last-recipes"],
        queryFn: () => getLastRecipe(),
        placeholderData: keepPreviousData
    });

    if (isLoading && isSearching) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <span>{error.message}</span>
            </div>
        );
    }

    if (!isSearching || data.items.length <= 0) {

        if (isLastFetchPending) {
            return (
                <div className="flex-1 flex flex-col justify-center items-center">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            );
        }

        if (lastRecipe) {
            return (
                <>
                    <div className="flex flex-col rounded-2xl p-6 bg-white border shadow-sm max-w-screen-lg mx-auto w-full">
                        <h2 className="text-2xl font-bold mb-2">Dernière recherche</h2>
                        <RecipeCard recipe={lastRecipe} />
                    </div>
                </>
            );
        }

        return (
            <div className="flex flex-col rounded-2xl p-6 bg-white border shadow-sm max-w-screen-lg mx-auto w-full">
                <h2 className="text-2xl font-bold mb-2">Aucune recette trouvée</h2>
                <p className="text-gray-500">Essayer de faire une recherche</p>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col flex-wrap max-w-screen-lg mx-auto w-full">
                {data.items.map((recipe) => (
                    <RecipeCard key={recipe.name} recipe={recipe} />
                ))}
            </div>
        </>
    );
}

function PageContentRecipesByCalories() {
    const { isLoading, recipesByCalories } = useRecipesByCaloriesContext();

    const { data: lastRecipe, isPending: isLastFetchPending } = useQuery({
        queryKey: ["get-last-recipes"],
        queryFn: () => getLastRecipe(),
        placeholderData: keepPreviousData
    });

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col justify-center items-center">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    if (recipesByCalories?.length <= 0) {

        if (isLastFetchPending) {
            console.log('isLastFetchPending')
            return (
                <div className="flex-1 flex flex-col justify-center items-center">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            );
        }

        if (lastRecipe) {
            console.log('lastRecipe')
            return (
                <>
                    <div className="flex flex-col rounded-2xl p-6 bg-white border shadow-sm max-w-screen-lg mx-auto w-full">
                        <h2 className="text-2xl font-bold mb-2">Dernière recherche</h2>
                        <RecipeCard recipe={lastRecipe} />
                    </div>
                </>
            );
        }

        console.log('no lastRecipe')
        return (
            <div className="flex flex-col rounded-2xl p-6 bg-white border shadow-sm max-w-screen-lg mx-auto w-full">
                <h2 className="text-2xl font-bold mb-2">Aucune recette trouvée</h2>
                <p className="text-gray-500">Essayer de faire une recherche</p>
            </div>
        );
    }

    console.log('recipesByCalories')
    return (
        <>
            <div className="flex flex-col flex-wrap max-w-screen-lg mx-auto w-full">
                {recipesByCalories?.map((recipe) => (
                    <RecipeCard key={recipe.name} recipe={recipe} />
                ))}
            </div>
        </>
    );
}

export default function Home() {
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get("search") || null;

    return (
        <RecipesByCaloriesProvider>
            <div className="flex flex-col lg:flex-row gap-4">
                <main className="flex-1">
                    {
                        searchText !== null
                            ? <PageContentRecipes/>
                            : <PageContentRecipesByCalories/>
                    }
                </main>
                <aside className="w-96 flex flex-col gap-2">
                    <div className="card rounded-2xl bg-white border shadow-sm max-w-screen-lg mx-auto w-full">
                        <div className="card-body p-6">
                            <h2 className="card-title">Recommandations de saisons</h2>
                            <SeasonRecommandation/>
                        </div>
                    </div>
                    <div className="card rounded-2xl bg-white border shadow-sm max-w-screen-lg mx-auto w-full mt-3">
                        <div className="card-body p-6">
                            <h2 className="card-title">Rechercher par calories</h2>
                            <SearchByCalorie/>
                        </div>
                    </div>
                </aside>
            </div>
        </RecipesByCaloriesProvider>
    );
}
