import React from "react";

const RecipesByCaloriesContext = React.createContext(undefined);

export function RecipesByCaloriesProvider({ children }) {
  const [recipesByCalories, setRecipesByCalories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const contextValue = {
    recipesByCalories,
    setRecipesByCalories,
    isLoading,
    setIsLoading,
  };

  return (
    <RecipesByCaloriesContext.Provider value={ contextValue }>
      {children}
    </RecipesByCaloriesContext.Provider>
  );

}

export const useRecipesByCaloriesContext = () => {
    const context = React.useContext(RecipesByCaloriesContext);

    if (context === undefined) {
        throw new Error(
        "useRecipesByCalories must be used within a RecipesByCaloriesProvider"
        );
    }

    return context;
}
