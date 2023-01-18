import {Request, Response, NextFunction } from 'express'
import UserQuery from '../db/UserQuery'
import Password from '../util/password'
import jwtToken from '../util/jwt'
import { UserDto } from '../dto/user.dto'
import systemResponse from '../util/response'

export async function registerUser (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password, image } = req.body
    if(!email && !password){
        return systemResponse.badRequest(res, 'All Field are Reqiured')
    }
    const userExist = await UserQuery.getUserByEmail(email)
    console.log(userExist)
    if(userExist.length > 0){
        return systemResponse.badRequest(res, 'User already Exist')
    }
    const hashDash = new Password(10)
    const hashedPassword = await hashDash.hashPassword(password)
    const user: UserDto = {
        email,
        password : hashedPassword,        
    }
    try {
        await UserQuery.createUser(user)
        // send welcome mail via node event emmitter
        return systemResponse.success(res, 'Publisher Account Created Successfully', 201)
    } catch (error) {
        next(error)
    }
}

export async function login (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body
    if(!email && !password){
        return systemResponse.badRequest(res, 'All Field are Reqiured')
    }

    try {
        const userExist = await UserQuery.getUserByEmail(email)
        console.log(userExist)
        if(!userExist && !userExist.length){
            return systemResponse.badRequest(res, 'Invalid credentials')
        }
    
        const hash = new Password(10);
        const isMatch = await hash.compare(password, userExist[0].password);
    
        if(!isMatch){
            return systemResponse.badRequest(res, 'Invalid credentials')
        }
        let payload = {
            id: userExist[0].id,
            email: userExist[0].email,
            image: userExist[0].image
        }
        const accessToken = jwtToken.generate(payload);
        return systemResponse.success(res, accessToken);
    } catch (error) {
        next (error)
    }


}
