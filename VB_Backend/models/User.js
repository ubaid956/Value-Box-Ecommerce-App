import mongoose from "mongoose";

const myUser = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlenght: 5
    },
    profilePic: {
        type: String,
        default: ""
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        default: null
    },
    otpExpiresAt: {
        type: Date,
        default: null
    }

}, { timestamps: true }
)

myUser.methods.isOtpExpired = function () {
    return this.otpExpiresAt ? new Date() > this.otpExpiresAt : true;
  };
const User = mongoose.model('user', myUser)
export default User