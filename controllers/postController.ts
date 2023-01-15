import {Request, Response, NextFunction } from 'express'
import PostQuery from '../db/PostQuery'
import { PostDto } from '../dto/post.dto'
import systemResponse from '../util/response'

export async function createPost (req: Request, res: Response, next: NextFunction): Promise<void>{
    const { title, content, image } = req.body
    const user_id = (req as any).token.id;

    const post = {
        user_id,
        title,
        content,
        image
    }
    try {
        await PostQuery.createPost(post)
        return systemResponse.success(res, 'New Post Published Successfully', 201)
    } catch (error) {
        next(error)
    }
}

export async function getAllPosts (req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const posts = await PostQuery.getAllPost()
        return systemResponse.success(res, posts, 200)
    } catch (error) {
        next(error)
    }
}



export async function getPost (req: Request, res: Response, next: NextFunction): Promise<void>{
    const postId = req.params.id
    try {
        const post = await PostQuery.getPostById(parseInt(postId))
        if(!post && !post.length){
            // return fail status
            return systemResponse.badRequest(res, 'Post Does Not Exist')
        }
        return systemResponse.success(res, post, 200)
    } catch (error) {
        next(error)
    }
}

// getPostByCategory
export async function getPostByCategory (req: Request, res: Response, next: NextFunction): Promise<void>{
    const category = req.params.category
    try {
        const posts = await PostQuery.getPostByCategory(category)
        if(!posts && !posts.length){
            // return fail status
            return systemResponse.badRequest(res, 'Post Does Not Exist')
        }
        return systemResponse.success(res, posts, 200)
    } catch (error) {
        next(error)
    }
}


export async function updatePost (req: Request, res: Response, next: NextFunction): Promise<void>{
    const postId = req.params.id
   
    try {
        const post = await PostQuery.getPostById(parseInt(postId))
        if(!post && !post.length){
            // return fail status
            return systemResponse.badRequest(res, 'Post Does Not Exist')
        }
        await PostQuery.updatePost(post[0].id, req.body)
        return systemResponse.success(res, 'Post Updated Successfully', 200)
    } catch (error) {
        next(error)
    }
}

export async function deletePost (req: Request, res: Response, next: NextFunction): Promise<void>{
    const postId = req.params.id
    try {
        const post = await PostQuery.getPostById(parseInt(postId))
        if(!post && !post.length){
            // return fail status
            return systemResponse.badRequest(res, 'Cannot Delete a Post That Does Not Exist')
        }
        await PostQuery.deletePost(post[0].id)
        return systemResponse.success(res, 'Post Deleted Successfully', 200)
    } catch (error) {
        next(error)
    }
}

