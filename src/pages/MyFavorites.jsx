import { useQuery } from "@tanstack/react-query"
import { fetchUserFavorites } from "../api/user.js"
import RecipeCard from "../components/RecipeCard.jsx"

export default function MyFavorites() {
    const { isPending, data, isError, error } = useQuery({
        queryKey: ["user", "favorites"],
        queryFn: () => fetchUserFavorites(),
    })

    if (isPending) {
      return (
        <div className="flex-1 flex flex-col justify-center items-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex-1 flex flex-col justify-center items-center">
          <span className="text-2xl">{error.message}</span>
        </div>
      );
    }

    return <div className="m-8">
        <header className="mb-10">
            <h2 className="text-2xl">Mes favoris</h2>
        </header>

        <div className="flex flex-col gap-8">
            {data.items.map((recipe) => (
                <RecipeCard key={recipe.name} recipe={recipe} />
            ))}
        </div>
    </div>
}
