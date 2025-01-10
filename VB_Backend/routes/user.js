import express from 'express'
import { createUser, login,editProfile,profilePic, emailVerify, checkOTPandUpdatePassword } from '../Controllers/userController.js'
import { auth } from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.post('/login', login)
userRouter.post('/signup', createUser)
userRouter.put('/edit', auth, editProfile)
userRouter.post('/profile', auth, profilePic)
userRouter.post('/forgot', emailVerify)
userRouter.patch('/updatePassword', auth, checkOTPandUpdatePassword)


export default userRouter