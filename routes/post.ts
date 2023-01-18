import express from 'express'
import { createPost, updatePost, getAllPosts, getPost, deletePost, getPostByCategory } from '../controllers/postController'
import verifyAuth from '../middleware/verifyAuth'
const postRouter = express.Router()

postRouter.get('/post/all', getAllPosts)

postRouter.get('/post/:id', getPost)

postRouter.post('/post/create', verifyAuth.authMiddlewareHandler, createPost)

postRouter.patch('/post/:id', updatePost)

postRouter.patch('/post/:category', getPostByCategory)

postRouter.delete('/post/:id', deletePost)



export default postRouter