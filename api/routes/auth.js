const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');

//REGISTERING
router.post("/register", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser =  new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);
    }
});

//LOGGING IN
router.post("/login", (req, res) => {
    try{
        User.findOne({username: req.body.username})
        .then(user => {
            bcrypt.compare(req.body.password, user.password)
            .then(validated => {
                if(validated) {
                    const{password, ...others} = user._doc;
                    res.status(200).json(others);
                }
                else { res.status(400).json("Incorrect password")}
            })
        })
        .catch(err=> {res.status(400).json("User not found")});
    } catch(err){
        res.status(500).json(err);
    }
});
module.exports = router;