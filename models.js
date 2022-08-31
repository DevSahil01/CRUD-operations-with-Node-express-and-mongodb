const mongoose=require('mongoose');
const blogschema=mongoose.Schema({
    title:String,
    keyword:String,
    blog:String,
    data:{type:Date ,default:Date.now}
})
module.exports=mongoose.model('blog',blogschema)
