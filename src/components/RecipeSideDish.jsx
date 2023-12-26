import { useQuery } from "@tanstack/react-query";
import { fetchRecipeSideDish } from "../api/recipes";

export default function RecipeSideDish({ recipeName }) {
  const { data, isPending } = useQuery({
    queryKey: ["recipe", recipeName, "sideDish"],
    queryFn: () => fetchRecipeSideDish(recipeName),
  });

  if (isPending) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (!data?.sideDishes) {
    return (
      <p className="text-gray-600 text-sm mx-auto mb-2">
        Pas d'Accompagnements
      </p>
    );
  }

  return (
    <ul className="flex flex-col list-disc mx-8">
      {data.sideDishes.map((dish, index) => (
        <li key={index}>{dish}</li>
      ))}
    </ul>
  );
}
