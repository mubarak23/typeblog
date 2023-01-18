import { Request, Response, NextFunction } from "express";
import UserQuery from "../db/UserQuery";
import jwtToken from '../util/jwt'
import systemResponse from '../util/response'

export interface CustomRequest extends Request {
    token: string | undefined
}


class VerifyAuth  {
    async authMiddlewareHandler (req: Request, res: Response, next: NextFunction){
        try{

            const token = req.headers.authorization?.split(" ")[1];
            if(!token){
                return systemResponse.unauthorized(res, 'Unauthorized')
            }
            const decoded = jwtToken.verify(token)

            const user = await UserQuery.getUserById(decoded.id)
            if(!user && !user.length){
                return systemResponse.notFound(res, 'User Not Found')
            }
            (req as CustomRequest).token = decoded;
            next()
        }catch(error){
            return systemResponse.unauthorized(res, 'Unauthorized')
        }
    }
}

export default new VerifyAuth()