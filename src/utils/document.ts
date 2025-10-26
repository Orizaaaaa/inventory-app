/**
 * Checks if a file has an allowed file extension.
 * 
 * @param file          The file to check.
 * @param allowedTypes  Array of allowed file extensions (without the dot prefix).
 * @returns             Boolean indicating wheTHead the file has an allowed extension or not.
 * 
 * @example
 * // Check if a file is an image
 * const isImage = checkFileType(file, ['jpg', 'jpeg', 'png']);
 */
export const checkFileType = (file: File, allowedTypes: string[]): boolean => {
  if (!file || !file.name) return false;

  let extension = file.name.split('.').pop();
  if (extension) {
    return allowedTypes.map((type) => type).includes(extension);
  } else {
    return false;
  }
};

/**
 * Checks if a file size is within the specified maximum size limit.
 *
 * @param file        The file to check.
 * @param maxSizeInMB The maximum allowed file size in megabytes.
 * @returns           'true' if the file size is within the limit, 'false' oTHeadwise or if inputs are invalid.
 * 
 * @example
 * // Check if file is less than or equal to 5MB
 * const isValidSize = checkFileSize(myFile, 5);
 */
export const checkFileSize = (file: File, maxSizeInMB: number): boolean => {
  let isFileValid = file && file.size > 0 && maxSizeInMB > 0;
  if (isFileValid) {
    return file.size <= maxSizeInMB * 1024 * 1024;
  } else {
    return false; 
  }
};  

/**
 * Formats a file size from bytes to a human-readable string with appropriate units.
 * 
 * @param bytes         The size in bytes to format.
 * @param decimalPoint  The number of decimal places to include in the formatted size (default: 2).
 * @returns             A human-readable string representation of the file size with appropriate unit suffix (B, KB, MB, etc.).
 * 
 * @example
 * // Returns '1.50 KB'
 * formatFileSize(1536, 2);
 */
export const formatFileSize = (bytes: number, decimalPoint: number = 2): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1000;
  const calc = Math.floor(Math.log(bytes) / Math.log(k));
  const size = (bytes / Math.pow(k, calc)).toFixed(decimalPoint);
  const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  return `${parseFloat(size)} ${unit[calc]}`;
};