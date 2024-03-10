const { default: mongoose } = require('mongoose')
module.exports = mongoose.connect('mongodb://127.0.0.1/GRPC-PROJECT')
.then (()=> console.log("connected to data base")).catch(err => console.log(err.message))