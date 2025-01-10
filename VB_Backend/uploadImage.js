import cloudinary from './cloudinaryConfig';

export const uploadImage = async (file) => {
    try {
        const result = await cloudinary.v2.uploader.upload(file.path);
        return result.secure_url; // Returns the URL of the uploaded image
    } catch (error) {
        throw new Error('Error uploading image: ' + error.message);
    }
};
