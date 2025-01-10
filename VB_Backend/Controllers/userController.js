import user from '../models/User.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v2 as cloudinaryV2 } from 'cloudinary';
import sendMail from '../sendmail.js';


cloudinaryV2.config({
    cloud_name: 'ddaebdx3n',
    api_key: '934264498649928',
    api_secret: 'jC_JZ60XVJ5MziXTuCVhCyp06Jw'
});

export const createUser = async (req, res)=>{
    const {name, email, password, username} = req.body;
    try{
        const normalizedEmail = email.toLowerCase();
        const oldUser = await user.findOne({email: normalizedEmail})
        if (oldUser) {
            return res.send(`User with ${email} already exists`);
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await user.create({
            email: normalizedEmail,
            password: hashedPassword,
            username,
            name,
        
       })

       const token = jwt.sign({id: newUser._id}, process.env.SECRET_KEY)
        console.log("User Created")
        

        return res.status(200).json({ token, email: newUser.email });
    }
    catch (error) {
        console.error('Error during sign up:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export const login = async (req, res) => {

    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
      const oldUser = await user.findOne({ email: email });
  
      if (!oldUser)
        return res.status(404).json({ message: "User doesn't exist." });
  

      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
  
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: oldUser._id },process.env.SECRET_KEY);
  
      res
        .status(200)
        .json({ token, id: oldUser._id, username: oldUser.username , profilePic: oldUser.profilePic});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };


  export const editProfile = async (req, res)=>{
    const {username, password} = req.body;
    const userId = req.userId; 
    try {
      // Find the user by their ID
      const existingUser = await user.findById(userId);
  
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // If a new username is provided, update it
      if (username) {
        existingUser.username = username;
      }
  
      // If a new profilePic is provided, update it
    
  
      // If a new password is provided, hash it before saving
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        existingUser.password = hashedPassword;
      }
  
      // Save the updated user profile
      await existingUser.save();
  
      // Return the updated user profile data (without the password)
      return res.status(200).json({
        message: "Profile updated successfully",
        username: existingUser.username,
        profilePic: existingUser.profilePic,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  export const profilePic = async (req, res) => {
    const profile = req.files.profilePic; 
    const userId = req.userId; 

    try {
        if (!profile) {
            return res.status(400).json({ message: "No profile picture uploaded" });
        }

        // Upload profile picture to Cloudinary
        const result = await cloudinaryV2.uploader.upload(profile.tempFilePath);

        const updatedUser = await user.findByIdAndUpdate(userId, {
            profilePic: result.url 
        }, { new: true }); 

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Profile picture updated successfully",
            profilePic: updatedUser.profilePic
        });

    } catch (error) {
        console.error("Error updating profile picture:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const emailVerify = async (req, res)=>{
  const {email} = req.body;
  try{
    const oldUser = await user.findOne({email})
    if(!oldUser) return { error: "You don't have an account, try with another email" };

    const code = Math.floor(1000 + Math.random() * 9000).toString();
    oldUser.otp = code;
    oldUser.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await oldUser.save();
    // if(emailExists.error){
    //   return res.status(400).json({message: emailExists.message})
    // }
    const mailOptions = {
      from: {
        name: 'MONEY LINK',
        address: process.env.USER, // Adjust the environment variable name if necessary
      },
      to: email,
      subject: "Money Link",
      text: `Your verification code is ${code}`, // Text content
      html: `<html><body><p><b>${code}</b></p></body></html>`, // HTML content
    };

    // Send the email
    await sendMail(mailOptions);
    return res.status(200).json({
      message: "Profile picture updated successfully",
      oldUser
  });
    // res.status(200).json(oldUser);
  } catch (error) {
    console.error("Error in Finding user email:", error);
    return res.status(500).json({ message: "Error in Finding user email" });
  }

}
export const checkOTPandUpdatePassword = async (req, res) => {
  const { newPassword, OTP } = req.body;
  const userId = req.userId; 
  
  try {
   
    const oldUser = await user.findById(userId);
    if (!oldUser) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    console.log(`Stored OTP: ${oldUser.otp}`);
    console.log(`Provided OTP: ${OTP}`);

    // Step 2: Check if OTP is expired
    if (oldUser.isOtpExpired()) {
      return res.status(400).json({ error: true, message: "OTP has expired" });
    }

    // Step 3: Check if OTP is correct
    if (oldUser.otp !== OTP) {
      return res.status(400).json({ error: true, message: "Your OTP is incorrect" });
    }

    // Step 4: Check if the new password is the same as the old password
    const isSameAsOld = await bcrypt.compare(newPassword, oldUser.password);
    if (isSameAsOld) {
      return res.status(400).json({ error: true, message: "New password cannot be the same as the old password" });
    }

    // Step 5: Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Step 6: Update the user with the new password and clear OTP fields
    oldUser.password = hashedPassword;
    oldUser.otp = null;
    oldUser.otpExpiresAt = null;
    await oldUser.save();

    return res.status(200).json({
      message: "Password updated successfully",
      user: oldUser,
    });

  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};
