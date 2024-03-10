const { productModel } = require("../model/productModel")
async function productList(call , callback){
    try {
        const products = await productModel.find({})
        callback(null , {products}) 
    } catch (error) {
        callback(error)
    }
   
}
async function getProduct(call , callback){
    try {
        const {id} = call.request;
        const product = await productModel.findOne({_id:id})
        if(!product)  callback({message : "couldn't find the product"} , null)
        callback(null , product)
    } catch (error) {
        callback(error)
    }

}
async function createProduct(call , callback){
    try {
        const {title , price} = call.request;
        await productModel.create({title , price});
        const response = {status:201 , data :{message: "product added successfully"}}
        callback(null , response)
    } catch (error) {
        callback(error)
    }

}
async function updateProduct(call , callback){
    const {_id , title , price}= call.request 
    const result = await productModel.updateOne({_id} , {$set:{title , price}} )
    if(!result.modifiedCount) callback({message:"failed to update product"})
    const response = {status : 200 , data : {message :"updated successfully"}}
    callback(null , response)

}
async function deleteProduct(call , callback){
    const {id} = call.request
    const result = await productModel.deleteOne({_id :id})
    if(!result.deletedCount) callback({message :"deleting product failed"} , null)
    const response = {status:200 , data :{message :"product removed successfully"}}
    callback(null  , response)
}

module.exports = {
    productList,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}