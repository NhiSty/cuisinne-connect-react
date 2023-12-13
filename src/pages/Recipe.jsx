import useSWR from "swr";
import {useLocation, useNavigation, useParams} from "react-router-dom";
import '../styles/Recipe.css'
import RecipeStarsRating from "../components/RecipeStarsRating.jsx";
import Instructions from "../components/InstrcutionStep.jsx";
import Ingredient from "../components/Ingredients.jsx";

export default function Recipe() {
    const { recipeId } = useParams();
    const { data: recipe } = useSWR(`/api/recipes/${recipeId}`, fetcher);

    console.log(recipe)

        if (!recipe) {
        return <span className="loading loading-dots loading-sm"></span>
    }

    return (
        <>
            <div className="bg-white shadow-sm content-recipe">
                <h1 className={'text-2xl mb-10'}>{recipe.title}</h1>
                <div className={' w-full flex flex-row items-start'}>
                    <RecipeStarsRating recipeId={recipe.id} />
                </div>
                <div className={'mt-10 w-full flex flex-row justify-center'}>
                    <img className={'w-4/5 rounded-2xl'} src={recipe.image} alt={recipe.title} />
                </div>
                <div className={'mt-10 mb-6'}>
                    <h5>Durée de préparation: {recipe.cookingTime} minutes</h5>
                </div>
                <div className="divider"></div>
                <div className={'mt-6'}>
                    <h4>Ingrédients</h4>
                    <Ingredient recipeId={recipe.id} />
                </div>
                <div className="divider"></div>
                <div className={'mt-6 w-full'}>
                    <h4>Instructions</h4>
                        <Instructions instructions={recipe.instructions} />
                </div>
            </div>
        </>
    )
}

function fetcher(url) {
    return fetch(`http://localhost:3000${url}`).then((r) => r.json());
}
