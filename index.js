const express = require('express')
const app = express()
const port = 3000
//for serving the html files in response
const path=require('path')
//for parsing the that is coming from the different methods
const bodyParser=require('body-parser')
//connect to the database
const mongoose=require('mongoose');
//following is required for getting the data from the html form 
app.use(bodyParser.urlencoded({ extended: true })); 
const blog=require('./models')
const e = require('express')
mongoose.connect("mongodb://localhost:27017/blog",{useNewUrlParser: true})

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'blog_form.html'))
})
app.post('/addblog',function(req,res){
    var blogs = new blog({
        title:req.body.title,
        keyword:req.body.keyword,
        blog:req.body.blog
      });
      blogs.save((err, doc) => {
        if (!err){
            res.send("the data is inserted successfully")
            }
        else{
           res.send("the data is not inserted successfully")}
  });
})
app.set('views', './views');
app.set('view engine', 'ejs');
app.get('/view',function(req,res,next){
    blog.find({},function (err, blogs){
        if (err) {
            console.log(err)
        } else {
            res.render('blogs', {blogs:blogs})
        }
    })
})
app.get('/delete/:id',async (req, res) => {
    var id=req.params.id
    blog.findByIdAndRemove(id,function(err,docs){
      if(err){
        console.log(err)
      }
      else{
        res.redirect("/view")
      }
    })
  })
app.get('/update/:id',function(req,res){
   blog.findById(req.params.id,function(err,blogs){
    if(err){
        console.log(err)
    }
    else{
        res.render('update',{blogs:blogs})
    }
   }
)})
app.post('/put/:id',function(req,res){
    blog.findByIdAndUpdate(req.params.id,{
        "title":req.body.title,
        "keyword":req.body.keyword,
        "blog":req.body.blog
    },function(err,result){
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/view')
        }
    })
})
app.listen(port, () => {
  console.log(`Example app listning to this port localhost:${port}`)
})