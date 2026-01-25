import axios from "axios";

// Langsung gunakan import.meta.env
const cloudName = import.meta.env.VITE_APP_CLOUDINARY_NAME;
export const postImage = async ({ image }: { image: any }) => {
    const apiRequest = new FormData();
    apiRequest.append('file', image as File);
    apiRequest.append('upload_preset', 'desa_cms');

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
            apiRequest
        );
        console.log(response.data.secure_url);
        return response.data.secure_url;

    } catch (error) {
        console.error('Error uploading the image', error);
        throw error; // Lebih baik throw error agar bisa ditangani di tempat pemanggil
    }
}

export const postImagesArray = async ({ images }: { images: any[] }) => {
    const urls = [];

    for (const image of images) {
        const apiRequest = new FormData();
        apiRequest.append('file', image as File);
        apiRequest.append('upload_preset', 'desa_cms');

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                apiRequest
            );
            console.log(response.data.secure_url);
            urls.push(response.data.secure_url);
        } catch (error) {
            console.error('Error uploading the image', error);
            urls.push(null);
        }
    }
    return urls;
}