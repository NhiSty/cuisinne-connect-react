import { fetcher } from "./http";

/**
 * Result object interface
 * @interface Result
 * @property {Array} items - The items in the current page.
 */

/**
 * Get all recipes from API
 * @returns {Promise<Result>} List of recipes
 */
export async function getRecipes(value) {
  const result = await fetcher(`/api/recipes?search=${value}`);

  return {
    items: result.items,
  };
}

/**
 * Get last recipe of db
 * @returns {Promise<any[]>} returns a promise with the recipe
 */
export function getLastRecipe() {
  return fetcher(`/api/recipes/last`);
}


/**
 * Get a recipe from API
 * @param {number} name name of the recipe
 * @returns {Promise<any>}
 */
export function getRecipe(name) {
  return fetcher(`/api/recipes/${name}`);
}

/**
 * Get course list from gpt for a specific recipe
 * @param {string} name name of the recipe
 * @returns {Promise<any>}
 */
export function getListCourse(name) {
  return fetcher(`/api/recipes/${name}/listCourse`);
}

/**
 * Get ingredients for a specific recipe
 * @param {string} name name of the recipe
 * @returns {Promise<any[]>} returns a promise with the ingredients
 */
export function getRecipeIngredients(name) {
  return fetcher(`/api/recipes/${name}/ingredients`);
}

/**
 * Fetch recipe rating
 * @param {string} name name of the recipe
 * @returns {Promise<{ rating: number }>} returns a promise with the rating
 */
export function getRecipeRating(name) {
  return fetcher(`/api/recipes/${name}/rating`);
}

/**
 * Fetch seasons recommendations
 * @returns {Promise<{ recipes: string[] }>} returns a list of recipes
 */
export function fetchSeasonsRecommendations() {
  return fetcher("/api/recipes/seasons");
}

/**
 * Fetch similar recipes
 * @param {string} name name of the recipe
 * @returns {Promise<{ recipes: string[] }>} returns a list of recipes
 */
export function fetchSimilarRecipes(name) {
  return fetcher(`/api/recipes/${name}/similar`);
}

/**
 * Fetch recipe side dishes
 * @param {string} name name of the recipe
 * @returns {Promise<{ sideDishes: string[] }>} returns a list of recipes
 */
export function fetchRecipeSideDish(name) {
  return fetcher(`/api/recipes/${name}/sideDish`);
}

/**
 * Fetch comments for the recipe
 * @param {string} name name of the recipe
 * @returns {Promise<{ comments: string[] }>} returns a list of comments
 */
export function fetchRecipeComments(name) {
  return fetcher(`/api/recipes/${name}/comments`);
}

/**
 * Post a new comment for the recipe
 * @param {string} name name of the
 * @return {Promise<void>}
 */
export function postRecipeComment(name, rating, comment) {

  console.log("dans recipes.js de react api, name : ", name);
  console.log("dans recipes.js de react api, rating : ", rating);
  console.log("dans recipes.js de react api, comment : ", comment);
  
  return fetcher(`/api/recipes/${name}/comments`, {
    method: "POST",
    body: JSON.stringify({ rating, comment }),
  });
}
