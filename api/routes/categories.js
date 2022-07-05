const router = require("express").Router();
const Category = require("../models/Category");

// CREATING CATEGORY
router.post("/", (req, res) => {
    const newCat = new Category(req.body);
    newCat.save()
    .then(savedCat => res.status(200).json(savedCat))
    .catch(err => res.status(500).json(err));
});

// GETTING ALL CATEGORIES
router.get("/", (req, res) => {
    Category.find()
    .then(cats => res.status(200).json(cats))
    .catch(err => res.status(500).json(err));
})
module.exports = router;