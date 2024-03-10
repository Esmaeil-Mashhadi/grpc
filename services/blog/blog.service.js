const { connectDB } = require('./config/db.connection')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')

 connectDB()

const protoPath = path.join(__dirname , ".." , ".." , 'protos' , 'blog.proto')

const blogProto = protoLoader.loadSync(protoPath)
const {blogPackage} = grpc.loadPackageDefinition(blogProto)
const {blogList , getblog , createblog , updateblog , deleteblog} = require('./functions/blogServiceFunctions')

const blogServiceUrl = "localhost:4003"

const server = new grpc.Server()
server.addService(blogPackage.blogService.service , {
    blogList ,  
    getblog , 
    createblog , 
    updateblog , 
    deleteblog
})


server.bindAsync(blogServiceUrl , grpc.ServerCredentials.createInsecure() , (err , port)=>{
    if(err) return console.log(err.message);
    console.log(`service is running on port ${port}`);
  server.start()  
})