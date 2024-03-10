const { blogModel } = require("../model/blogModel");

const blogList = async(call , callBack)=>{
   const blogs = await blogModel.find({})
   if(!blogs || !blogs.length) callBack({message:"there is no blog right now"})
   callBack(null , {blogs})
}

const getblog = async(call , callBack)=>{
 const {id}  = call.request 
 const blog = await blogModel.findOne({_id: id})
 if(!blog) callBack({message:"coulnd't find the blog"})
 callBack(null ,blog)
}
const createblog = async(call , callBack)=>{
 const data = call.request 
 const blog = await blogModel.create(data)
 if(!blog) callBack({message :"failed to create blog"})
 const response = {status:201 , data : {message :"blogCreated successfully"}}
 callBack(null , response )
}
const updateblog = async(call , callBack)=>{
    const {id , data}  = call.request
    const updateblog = await blogModel.updateOne({_id:id} , {$set:data})
    if(!updateblog) callBack({message:"couldn't update the blog"})
    callBack(null , {message:"updated successfully"})

}
const deleteblog = (call , callBack)=>{

}


module.exports = {
    blogList , 
    getblog,
    createblog,
    updateblog , 
    deleteblog
}

