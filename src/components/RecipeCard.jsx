import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RecipeCard({ recipe }) {

  return (
    <div className="card bg-base-100 shadow-xl mb-6 relative">
      <Link to={`/recettes/${recipe.title}`}>
        <div className="card-body p-6 h-full">
          <h2 className="text-left font-bold text-xl">{recipe.title}</h2>
          <p>{recipe.description}</p>
        </div>
        <div className="absolute top-2 right-2 text-sm text-gray-500">
          {new Date(recipe.createdAt).toLocaleDateString()}
        </div>
      </Link>
    </div>
  );
  
}
