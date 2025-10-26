/**
 * Creates a debounced version of a fetch function.
 * 
 * Prevents excessive API calls by delaying the execution of the fetch function until a specified time 
 * has elapsed since the last invocation. If the function is called again before the delay has elapsed, 
 * the previous call is canceled.
 * 
 * @template T The type that the fetch function promises to return.
 * @param {(input: string) => Promise<T>} fetchFn   The original fetch function to debounce.
 * @param {number} delay                            The delay in milliseconds before executing the fetch function.
 * 
 * @example
 * // Create a debounced API call function with 300ms delay
 * const debouncedSearch = debounceFetch(api.searchItems, 300);
 */
export function debounceFetch<T>(fetchFn: (input: string) => Promise<T>, delay: number): (input: string) => Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | null;
  let currentReject: ((reason?:any) => void) | null = null;

  return (input: string): Promise<T> => {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    if (currentReject !== null) {
      currentReject();
      currentReject = null;
    }

    return new Promise<T>((resolve, reject) => {
      currentReject = reject;

      timeout = setTimeout(() => {
        fetchFn(input).then(resolve).catch(reject).finally(() => {
          timeout = null;
          currentReject = null;
        });
      }, delay);
    });
  };
}