const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    id:{type:Number}, 
    title : {type :String},
    price : {type:String}
})


module.exports ={
    productModel : mongoose.model("product" , productSchema) 
} 