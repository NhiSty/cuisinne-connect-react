import { QueryClient } from "@tanstack/react-query";
import { ValidationError } from "./errors";

/**
 * Fetcher function used to call the API
 * @param {string} url API URL to fetch
 * @param {RequestInit | undefined} options fetch options {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch}
 * @returns {Object} object value
 * @throws {Error}
 */
export async function fetcher(url, options) {
  try {
    const headers = options?.headers || {};
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    if (!response.ok) {
      const body = await response.json();
      if (response.status === 400) {
        throw new ValidationError(body.message, body.errors);
      }

      throw new Error(body.message);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const queryClient = new QueryClient();
