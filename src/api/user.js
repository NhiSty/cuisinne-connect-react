import {fetcher} from "./http";

/**
 * @interface User
 * @property {number} id The id of the user
 * @property {string} email The email of the user
 * @property {string} username The username of the user
 */

/**
 * Call the API to login the user
 * @param {string} email The email of the user
 * @param {string} password The password of the user
 * @returns {Promise<boolean>} The token of the user
 */
export async function login(email, password) {
  return await fetcher("/api/auth", {
    body: JSON.stringify({
      email,
      password,
    }),
    method: "POST",
  });
}

/**
 * Call the API to register the user
 * @param {string} username The username of the user
 * @param {string} email The email of the user
 * @param {string} password The password of the user
 * @param confirmation
 * @returns {Promise<boolean>} The token of the user
 */
export async function register(username, email, password, confirmation) {
  return await fetcher("/api/auth/register", {
    body: JSON.stringify({
      username,
      email,
      password,
      confirmation,
    }),
    method: "POST",
  });
}

/**
 * Call the API to logout the user
 * @returns {Promise<void>} The token of the user
 */
export async function logout() {
  return await fetcher("/api/auth", {
    method: "DELETE",
  });
}

/**
 * Call the API to fetch the user data
 * @returns {Promise<User>} The token of the user
 */
export async function fetchUser() {
  return await fetcher("/api/auth", {
    method: "GET",
  });
}

/**
 * Fetch user favorites recipes
 * @returns {Promise<any[]>} The favorites recipes of the user
 */
export async function fetchUserFavorites() {
  return await fetcher("/api/user/favorites", {
    method: "GET",
  });
}

/**
 * Fetch user settings
 * @returns {Promise<any>} The settings of the user
 */
export async function fetchUserSettings() {
  return await fetcher("/api/user/settings");
}

/**
 * Update user settings
 * @param {string[]} diets The diet of the user
 * @param {string[]} allergies The allergies of the user
 * @param {string[]} preferences The preferences of the user
 * @returns {Promise<void>}
 */
export async function updateUserSettings(diets = [], allergies = [], preferences = []) {
  return await fetcher("/api/user/settings", {
    body: JSON.stringify({
      diets,
      allergies,
      preferences,
    }),
    method: "POST",
  });
}
