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

export async function getRecipesByCalories(calories) {
    const response = await fetcher(`/api/recipes-by-categories?searchByCalories=${calories}`, {
        method: "GET",
    });

  console.log('call', response)

    return response.items
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
 * @param {string} name name of the recipe
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
 * @param {string} name name of the recipe
 * @param rating
 * @param comment
 * @return {Promise<void>}
 */
export function postRecipeRating(name, rating, comment) {
  return fetcher(`/api/recipes/${name}/comments`, {
    method: "POST",
    body: JSON.stringify({ rating, comment }),
  });
}

/**
 * Toggle recipe favorite state for user
 * @param {string} name name of the recipe
 * @return {Promise<void>}
 */
export function postToggleFavorite(name) {
  return fetcher(`/api/recipes/${name}/favorite`, {
    method: 'PUT'
  })
}

/**
 * Fetch comment responses
 * @param {name} name name of the recipe
 * @param {id} id id of the parent comment
 */
export function fetchCommentResponses(name, id) {
  return fetcher(`/api/recipes/${name}/comments/${id}`);
}

/**
 * Post comment response
 * @param {name} name name of the recipe
 * @param {id} id id of the parent comment
 * @param {comment} comment comment to post
 */
export function postCommentResponse(name, id, comment) {
  return fetcher(`/api/recipes/${name}/comments/${id}`, {
    method: "POST",
    body: JSON.stringify({ comment }),
  });
}
