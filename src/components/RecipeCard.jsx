import React from 'react';
import '../styles/RecipeCard.css';
import {useNavigate} from "react-router-dom";

export default function RecipeCard({ recipe }) {
    const navigate = useNavigate();

    const goToRecipe = () => {
        navigate(`/recettes/${recipe.id}`);
    }

    return (
        <>
            <div
                className="recipe-card shadow-xl mb-6"
                onClick={goToRecipe}
                style={{
                    backgroundImage: `url(${recipe.image})`,
            }}
            >
                <div className={'card-filter'}>
                    <div className="card-body recipe-card-body h-full">
                        <div>
                            <h2 className={'text-white text-left font-bold text-xl'}>
                                {recipe.title}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


