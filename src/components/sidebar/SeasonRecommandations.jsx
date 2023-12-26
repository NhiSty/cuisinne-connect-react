import { useSeasonialRecipes } from "../../hooks/recipes";
import { Link } from "react-router-dom";

export default function SeasonRecommandation() {
  const { data, isPending, isError } = useSeasonialRecipes();

  if (isPending) {
    return (
      <div className="mx-auto py-2">
        <span className="loading loading-dots loading-lg text-secondary"></span>
      </div>
    );
  }

  if (isError) {
    return <p>Une erreur est survenue, merci de réessayer plus tard.</p>;
  }

  return (
    <ul className="flex flex-col gap-3 px-4 py-2">
      {data.recipes.map((recipe) => (
        <li key={recipe}>
          <Link
            className="link link-hover link-primary"
            to={`/recettes/${recipe}`}
          >
            {recipe}
          </Link>
        </li>
      ))}
    </ul>
  );
}
