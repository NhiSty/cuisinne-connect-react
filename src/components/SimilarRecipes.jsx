export default function SimilarRecipes({ recipeName, similarRecipesData }) {

  if (!similarRecipesData?.recipes) {
    return (
        <p className="text-gray-600 text-sm mx-auto mb-2">
          Pas de recettes similaires
        </p>
    );
  }

  return (
      <ul className="flex flex-col list-disc mx-8">
        {similarRecipesData.recipes.map((recipe, index) => (
            <li key={index}>
              <a
                  href={`/recettes/${recipe}`}
                  className="link link-hover link-primary"
              >
                {recipe}
              </a>
            </li>
        ))}
      </ul>
  );
}
