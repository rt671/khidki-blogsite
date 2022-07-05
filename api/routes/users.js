const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");

// UPDATING
router.put("/:id", async(req, res)=> {
    if(req.body.userId === req.params.id) {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new:true})
            .then(updatedUser => {console.log(updatedUser); res.status(200).json(updatedUser);});
        } catch(err){
            console.log("Error connecting to database");
            res.status(500).json(err);
        }
}
    else {
        res.status(401).json("You can update only your account!");
    }
});

// DELETING
router.delete("/:id", (req, res) => {
    if(req.body.userId === req.params.id) {

        User.findById(req.params.id)
        .then(user => {
            Post.deleteMany({username: user.username})
            .catch("Couldn't delete posts");
            User.findByIdAndDelete(req.params.id)
            .then(val => res.status(200).json("User has been deleted. Sorry to see you go..."))
            .catch("Error occured, try again...");
        })
        .catch(err => res.status(400).json("User not found!"));
    }
    else {
        res.status(401).json("You can update only your account!");
    }
});
module.exports = router;

// GETTING USER
router.get("/:id", (req, res) => {
    User.findById(req.params.id)
    .then(user=>{
        const{password, ...others} = user._doc;
        res.status(200).json(others);
    })
    .catch(err => res.status(500).json(err));
})