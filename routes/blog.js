import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();
import { createBlog, myBlog, updateBlog, deleteBlog, getAllBlogs, getBlogById} from '../controllers/blog.js';


router.post('/newBlog',isAuthenticated,createBlog);

router.get('/myBlogs',isAuthenticated,myBlog);

router.put('/:id',isAuthenticated,updateBlog);

router.delete('/:id',isAuthenticated,deleteBlog);

router.get('/allblogs',getAllBlogs);

router.get('/blog/:id',isAuthenticated,getBlogById);



export default router;