import knex from "./knex";
import { UserDto } from "../dto/user.dto";

class Query {
    private knex: any

    constructor(knex: any){
        this.knex = knex
    }

    public async createUser(addUser: UserDto): Promise<any>  {
        return await this.knex('users').insert(addUser)
    }
    public async getUserByEmail(email: string): Promise<any>{
        return await this.knex('users').where('email', email)
    }

    public async getUserById(id: string): Promise<any>{
        return await this.knex('users').where('id', id)
    }

    public async updateUser(id: number, user: any):
    Promise<any> {
        return await this.knex('users').where('id', id).update(user);
    }

     // delete user
     public async deleteUser(id: number):
     Promise<any> {
     return await this.knex('users').where('id', id).del();
     
 }

}

let UserQuery = new Query(knex)

export default UserQuery

