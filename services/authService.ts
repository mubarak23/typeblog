import { User } from '../model/User';

export const createUser = async (reqData: any): Promise<User> => {
    return await User.query().insert(reqData)
}

// export const getUserByEmail = async (email: string): Promise<User> => {
//     return await User.query().findById(1)
// }