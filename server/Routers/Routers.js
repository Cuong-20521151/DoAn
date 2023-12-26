const express = require('express');
const router = express.Router()
const Dish = require('../models/dish')
const Comment = require('../models/comment')
const User = require('../models/user')
module.exports = router;

router.get('/getAllDish', async (req, res) => {
    try {
        const data = await Dish.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/getAllCmt', async (req, res) => {
    try{
        const data = await Comment.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get dish by userId
router.get('/getUserDish/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await Dish.find({ userId: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Get by user
router.get('/getUser', async (req, res) => {
    try{
        const data = await User.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Post by user
router.post('/Login', async (req, res) => {
    try{
        const data = await User.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Post by Signup
router.post('/Signup', async (req, res) => {
    const dish = new User({
        name: {
            firstname: req.body.name.firstname,
            lastname: req.body.name.lastname,
        },
        username: req.body.username,
        password: req.body.password
    })

    try {
        const dataToSave = await dish.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Post Method
router.post('/postDish', async (req, res) => {
    const dish = new Dish({
        foodName: req.body.foodName,
        foodPhoto: req.body.foodPhoto,
        foodProcessing: req.body.foodProcessing,
        foodIngredients: req.body.foodIngredients,
        cookingTime: req.body.cookingTime,
        feel: req.body.feel,
        foodRations: req.body.foodRations,
        mealType: req.body.mealType,
        foodProcessingType: req.body.foodProcessingType,
        userId: req.body.userId
    })

    try {
        const dataToSave = await dish.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const data = await Dish.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Dish.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
// Update by User 
router.patch('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//add comment
router.post('/postCmt', async (req, res) => {
    const comment = new Comment({
        cmt: req.body.cmt,
        food_id: req.body.food_id,
        userId: req.body.userId
    })
    try {
        const dataToSave = await comment.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})