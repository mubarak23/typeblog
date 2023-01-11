import express from 'express'
import { login, registerUser } from '../controllers/authController'

const authRouter = express.Router()

authRouter.post('/register', registerUser)

authRouter.post('/login', login)

export default authRouter