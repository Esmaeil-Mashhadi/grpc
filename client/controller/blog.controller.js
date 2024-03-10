const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const createHttpError = require('http-errors')
const path = require('path')

const protoPath = path.join(__dirname , '..' , '..' ,  'protos' , 'blog.proto')
const protoFiles = protoLoader.loadSync(protoPath)
const {blogPackage} = grpc.loadPackageDefinition(protoFiles)
const clientURL = 'localhost:4003'
const blogClient = new blogPackage.blogService(clientURL , grpc.credentials.createInsecure())


/**
 *
 */
const createBlog = (req , res , next)=>{
    try {
        const data = req.body
        blogClient.createblog(data , (err , data)=>{
            if(err){ 
               throw createHttpError.InternalServerError('failed to create blog') 
            } 
            return res.status(201).json(data)
        })
    } catch (error) {
        next(error)
    }
} 
 

const getAllBlogs = (req,  res , next)=>{
    try {
        blogClient.blogList(null , (err , data)=>{
            return res.status(200).json(data)
        })
    } catch (error) {
        next(error)
    }
  
}

const getBlogByID = (req , res, next)=>{
    try {
        const {id} = req.params
        console.log(id);
        blogClient.getblog({id} , (err , data)=>{
            if(err) throw createHttpError.InternalServerError()
            return res.status(200).json(data)
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogByID
}
