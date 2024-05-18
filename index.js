const express = require("express");
const {v4: uuidv4} = require('uuid'); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
let app = express();
let port = 3000;
const path = require("path");
const methodOverride = require("method-override");
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,"public")));
let posts = [
    {
        id:uuidv4(),
        name:"Devanshi Bhati",
        content:"Continuity is key to success."
    },
    {
        id:uuidv4(),
        name:"Dev",
        content:"I got selected for my first internship."
    },
    {
        id:uuidv4(),
        name:"Dolly",
        content:"I love coding."
    }
];
app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
});
app.get("/posts",(req,res)=>{
    res.render("index",{ posts });
});
app.get("/posts/new", (req, res) => {
    res.render("new");
});
app.post("/posts/new",(req,res)=>{
    // console.log("App is listening");
    // res.render("new.ejs");
    let {id,name,content} = req.body;
    posts.push({id,name,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find(p => id === p.id);
    console.log(id);
    res.render("show.ejs",{post});
});
app.get("/posts/:id/edit",(req,res)=>{
    let{id} = req.params;
    let post = posts.find(p => id === p.id);
    res.render("edit",{post});
});
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    // console.log(req.body.id);
    let post = posts.find(p => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
    // res.send("Patch req working");
});
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter(p => id != p.id);
    res.redirect("/posts");
});