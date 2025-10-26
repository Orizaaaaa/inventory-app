export const toImageSrc = (fileData?: string) => {
    if (!fileData) return "/placeholder.jpg";
    return fileData.startsWith("http") 
        ? fileData 
        : `data:image/jpeg;base64,${fileData}`;
};
