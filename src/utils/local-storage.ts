/**
 * Retrieves a value from localStorage by key.
 * Automatically parses JSON if the value appears to be an object or array.
 *
 * @param {string} key   The localStorage key to retrieve.
 * @returns {any | null} The parsed value, the raw string, or null if parsing fails or key doesn't exist.
 */
export const getLocalStorage = (key: string): any | null => {
  try {
    let storedData = localStorage.getItem(key);
    if(!storedData) return null;

    let firstChar = storedData.trim()[0];
    if (firstChar === "{" || firstChar === "[") {
      return JSON.parse(storedData);
    } else {
      return storedData;
    }
  } catch (error) {
    console.error(`Error parse localStorage data '${key}':`, error);
    return null;
  }
}

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clear localStorage data:", error);
  }
};