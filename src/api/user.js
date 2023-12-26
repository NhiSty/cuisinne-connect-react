import { fetcher } from "./http";

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
  const response = await fetcher("/api/auth", {
    body: JSON.stringify({
      email,
      password,
    }),
    method: "POST",
  });

  return response;
}

/**
 * Call the API to register the user
 * @param {string} username The username of the user
 * @param {string} email The email of the user
 * @param {string} password The password of the user
 * @returns {Promise<boolean>} The token of the user
 */
export async function register(username, email, password, confirmation) {
  const response = await fetcher("/api/auth/register", {
    body: JSON.stringify({
      username,
      email,
      password,
      confirmation,
    }),
    method: "POST",
  });

  return response;
}

/**
 * Call the API to logout the user
 * @returns {Promise<void>} The token of the user
 */
export async function logout() {
  const response = await fetcher("/api/auth", {
    method: "DELETE",
  });

  return response;
}

/**
 * Call the API to fetch the user data
 * @returns {Promise<User>} The token of the user
 */
export async function fetchUser() {
  const response = await fetcher("/api/auth", {
    method: "GET",
  });

  return response;
}
