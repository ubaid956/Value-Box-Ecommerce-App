import mongoose from "mongoose";

const product = mongoose.Schema({
    images: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.length > 0; // Ensure at least one image is present
            },
            message: 'A product must have at least one image.'
        },
        required: true
    },
    title: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },

    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    }],
    isWishlist: {
        type: Boolean,
        default: false
    },
    isCartList: {
        type: Boolean,
        default: false
    }

}, { timestamps: true }
)

const Product = mongoose.model('Product', product)
export default Product