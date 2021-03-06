const express = require('express');
const bodyParser = require("body-parser");
const ejs = require('ejs');
var  mongoose = require('mongoose');
const _ = require("lodash");




const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

var posts = [];

mongoose.connect("mongodb://localhost:3003/blogDB",{ useNewUrlParser: true , useUnifiedTopology: true });
//mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});
//mongoose Schema
const postSchema = {
    title:String,
    content:String
};

//mopngoose model
const post = mongoose.model("post",postSchema);


//home page
app.get("/",(req,res)=> {

    post.find({},(err,posts)=>{

        res.render("home" ,{
            homePage:homeStartingContent,
            posts:posts
        });
    })
   
});

//about page
app.get("/about",(req,res)=> {
    res.render("about" ,{aboutPage:aboutContent});
});

//contactn page

app.get("/contact",(req,res)=> {
    res.render("contact" ,{contactPage:contactContent});
});



//compose page

app.get("/compose",(req,res)=> {
  res.render("compose");
});


app.post("/compose",(req,res)=> {
  
   const post = new post({
    title:req.body.postTitle,
    content:req.body.postBody
   });
   post.save(()=> {
       if(!err) {
    res.redirect("/");
       }
   });
  
});
app.get("/posts/:postId",(req,res)=>{
    const requestedPostId = _.lowerCase(req.params.postId);

    posts.findOne({_id: requestedPostId },()=>{
        res.render('post',{
            Title:post.title,
            content:post.content
            });

    });
       
    
});




//port creation
app.listen(3000,()=> {
    console.log('server started')
});
