/**
 * Retrieves all search parameters from the current URL.
 * 
 * This function extracts all query string parameters from the browser's current URL
 * and converts them into a key-value object where the keys are parameter names
 * and values are parameter values.
 * 
 * @returns {Record<string, string>} An object containing all search parameters as key-value pairs.
 */
export const getAllSearchParams = (): Record<string, string> => {
  const params: Record<string, string> = {};
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};

/**
 * Builds a URL by preserving selected query parameters from the given URLSearchParams object.
 * 
 * @param basePath      Base path to append the query string.
 * @param searchParams  Original search parameters (usually from the URL).
 * @param excludedKeys  An array of query parameter keys to exclude from the result.
 * @returns {string}                                  
 */
export function buildURLWithPreservedQuery(
  basePath: string,
  searchParams: URLSearchParams,
  excludedKeys: string[] = ['page', 'limit']
): string {
  const filterParams = new URLSearchParams(
    [...searchParams].filter(([key]) => !excludedKeys.includes(key))
  );

  return filterParams.toString() 
    ? basePath + `?${filterParams.toString()}` 
    : basePath;
}