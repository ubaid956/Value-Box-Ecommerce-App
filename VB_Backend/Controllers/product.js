import Product from "../models/Product.js";
// import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';

cloudinaryV2.config({
    cloud_name: 'ddaebdx3n',
    api_key: '934264498649928',
    api_secret: 'jC_JZ60XVJ5MziXTuCVhCyp06Jw'
});

export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addProduct = async (req, res) => {
    const files = req.files.photos; 
    const { title, price, discount } = req.body;

    try {
        if (!files || (Array.isArray(files) && files.length === 0)) {
            return res.status(400).json({ message: "At least one image is required." });
        }

        let imageUrls = [];

        // If a single file is uploaded, convert it to an array to handle uniformly
        const fileArray = Array.isArray(files) ? files : [files];

        for (let file of fileArray) {
            const result = await cloudinaryV2.uploader.upload(file.tempFilePath);
            imageUrls.push(result.url);
        }

        // Save the product with the uploaded image URLs
        const newProduct = await Product.create({
            images: imageUrls,
            title,
            price,
            discount,
        });

        return res.status(200).json(newProduct);
    } catch (error) {
        console.error("Error uploading image(s) or saving product:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}
