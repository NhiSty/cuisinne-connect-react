import { useQuery } from "@tanstack/react-query";
import { fetchSeasonsRecommendations } from "../api/recipes";
import { QUERY_KEYS } from "../constants/queryKeys";

export function useSeasonialRecipes() {
  const now = new Date();
  const month = now.getMonth();

  return useQuery({
    queryKey: [QUERY_KEYS.seasonalRecipes, month],
    queryFn: fetchSeasonsRecommendations,
    staleTime: 1000 * 60 * 60, // store for 1 hour
  });
}
