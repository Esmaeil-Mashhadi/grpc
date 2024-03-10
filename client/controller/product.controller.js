const grpc = require('@grpc/grpc-js')
const protoLoader=  require('@grpc/proto-loader')
const path = require("path")
const productProtoPath = path.join(__dirname , ".." , ".." , "protos" , "product.proto")
const productProto = protoLoader.loadSync(productProtoPath)
const {productPackage} = grpc.loadPackageDefinition(productProto)
const productServiceURL = 'localhost:4001';

const productClient = new productPackage.ProductService(productServiceURL , grpc.credentials.createInsecure())

function productList(req , res , next){
 productClient.productList(null , (err , data)=>{
    if(err) next(err)  
    return res.status(200).json({
        status:200 , 
        data 
    })
 }) 
}
 function getProduct(req , res , next){
    const {id} = req.params
    productClient.getProduct({id}, (err ,data)=>{
        if(err) return next(err) 
        return res.status(200).json(data)
    })
}


function createProduct(req , res , next){
    const {title , price}  = req.body
     productClient.createProduct({title , price} , (err , data)=>{
        if(err) return next(err)
        return res.status(201).json(data)
     })
}
 function updateProduct(req , res , next){
    const {id} = req.params
    const product = req.body
    product._id = id
    productClient.updateProduct(product , (err , data)=>{
        if(err) return next(err)
        return res.status(201).json(data)
    })
}
 function deleteProduct(req , res , next){
    const {id} = req.params 
    productClient.deleteProduct({id} , (err , data)=>{
        if(err)  return next(err)
        return res.status(200).json({
            data
        })
    })
}

module.exports ={
    productList,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}

