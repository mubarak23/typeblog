import knex from "./knex";
import { User } from "../model/User";

class Query {
    private knex: any

    constructor(knex: any){
        this.knex = knex
    }

    // create a post
    public async createPost(newPost: any): Promise<any>  {
        return await this.knex('posts').insert(newPost)
    }

    // get all post
    public async getAllPost(): Promise<any>{
        return await this.knex('posts')
    }

    // get post by Id
    public async getPostById(id: number): Promise<any>{
        return await this.knex('posts').where('id', id)
    }

    // update post
    public async updatePost(id: number, post: any):
    Promise<any> {
        return await this.knex('users').where('id', id).update(post);
    }

     // delete user
     public async deletePost(id: number):
     Promise<any> {
     return await this.knex('posts').where('id', id).del();
     
 }


}

let PostQuery = new Query(knex)

export default PostQuery

