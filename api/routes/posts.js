const router = require("express").Router();
const Post = require("../models/Post");

// CREATING POST
router.post("/", (req, res) => {
    console.log("Hi, I am backend!, processing your request");
    const newPost = new Post(req.body);
    newPost.save()
    .then(savedPost => res.status(200).json(savedPost))
    .catch(err => {console.log("oops"); res.status(500).json(err)});
})

// UPDATING POST
router.put("/:id", (req, res)=> {
    Post.findById(req.params.id)
    .then(post => {
        if(post.username == req.body.username)
        {
            Post.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true})
            .then(updatedPost => res.status(200).json(updatedPost))
            .catch(err => res.status(500).json(err));
        }
        else res.status(401).json("Can update only your posts!!");
    })
    .catch(err=> res.status(500).json(err));
});

// DELETING POST
router.delete("/:id", (req, res)=> {
    Post.findById(req.params.id)
    .then(post => {
        if(post.username == req.body.username)
        {
            Post.findByIdAndDelete(req.params.id)
            .then(val => res.status(200).json("The post has been deleted!"))
            .catch(err => res.status(500).json(err));
        }
        else res.status(401).json("Can delete only your posts!!");
    })
    .catch(err=> res.status(500).json(err));
});

// GETTING POST
router.get("/:id", (req, res) => {
    Post.findById(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json(err));
})

// GETTING ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        if(username){
            posts = await Post.find({username});
        } else if(catName){
            posts = await Post.find({categories:{
                $in: [catName]
            }});
        } else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;