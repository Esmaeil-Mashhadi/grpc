const {Router}  = require("express")
const { createBlog, getAllBlogs, getBlogByID } = require("../controller/blog.controller")

const router = Router()
router.get('/list' , getAllBlogs )
router.get('/:id' , getBlogByID) 
router.post('/create' , createBlog)

module.exports = {
    blogRoutes : router
}