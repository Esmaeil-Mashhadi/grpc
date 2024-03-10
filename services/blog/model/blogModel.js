const { default: mongoose, model } = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {type:String},
    text:{type:String}
})


module.exports = {
    blogModel : model('blog' , blogSchema)
}