// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
    cloud_name:'ddaebdx3n',
    api_key:'934264498649928',
    api_secret:'jC_JZ60XVJ5MziXTuCVhCyp06Jw'
});

// Log the configuration
console.log(cloudinary.config());