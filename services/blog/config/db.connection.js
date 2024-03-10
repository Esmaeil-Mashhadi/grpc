const { default: mongoose } = require("mongoose")

 const connectDB = async ()=>{
       await mongoose.connect("mongodb://127.0.0.1/GRPC-PROJECT").then(()=> console.log('connected to db')).then((err)=>{
            console.log(err);
        })
 }

 module.exports ={
    connectDB
 }