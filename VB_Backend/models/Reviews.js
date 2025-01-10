import mongoose from "mongoose";


const reviews = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        default: "",
    }],

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

}, { timestamps: true })

const Reviews = mongoose.model('Reviews', reviews)
export default Reviews