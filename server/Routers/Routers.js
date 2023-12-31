const express = require('express');
const router = express.Router()
const Dish = require('../models/dish')
const Comment = require('../models/comment')
const User = require('../models/user')
const Save = require('../models/save')
const Rating = require('../models/rating')
const Flow = require('../models/flow')
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

//Get by ID rating
router.get('/getAllRating', async (req, res) => {
    try{
        const data = await Rating.find();
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
// get dish by food_id
router.get('/getAllDish/:id', async (req, res) => {
    try {
        const Id = req.params.id; 
        const data = await Dish.find({_id : Id});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get user
router.get('/postAllDish/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const userPosts = await Dish.find({ userId });
      res.json(userPosts);
      
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
// Endpoint API để lấy số lượng bài viết đã đăng của người dùng
router.get('/user-posts/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const userPostsCount = await Dish.countDocuments({ userId }); // Đếm số lượng bài viết từ bảng dishs có userId tương ứng
      res.json({ userPostsCount });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Endpoint API để lấy thông tin người dùng và số lượng bài viết đã đăng
  router.get('/user-info/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const user = await User.findById(userId); // Lấy thông tin người dùng từ bảng user
      const userPostsCount = await Dish.countDocuments({ userId }); // Đếm số lượng bài viết từ bảng dishs có userId tương ứng
  
      res.json({ user, userPostsCount });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;
// get save_dish by useID
router.get('/saved-posts/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Tìm tất cả các bản ghi trong collection Save mà có userId tương ứng
        const savedPosts = await Save.find({ userId });

        res.status(200).json({ savedPosts });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
//////////////////////////////////////////////////////// Post /////////////////////////////////////////////////////////////////////////////
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
    const { firstname, lastname, username, password } = req.body;
    const defaultImageUrl = "https://5.imimg.com/data5/ANDROID/Default/2021/1/WP/TS/XB/27732288/product-jpeg.jpg";
  
    if (!username || !password || !firstname || !lastname) {
      return res.status(400).json({ error: 'Vui lòng cung cấp đủ thông tin.' });
    }
  
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Tên người dùng đã tồn tại. Vui lòng chọn tên khác.' });
      }
  
      const newUser = new User({
        username,
        password,
        name: {
          firstname,
          lastname,
        },
        userImage: defaultImageUrl // Thêm URL mặc định vào trường userImage
      });
  
      await newUser.save();
      res.status(201).json({ message: 'Người dùng tạo thành công.' });
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      res.status(500).json({ error: 'Đăng ký thất bại. Vui lòng thử lại.' });
    }
  });
  

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
        userId: req.body.userId,
        aveRating: req.body.aveRating
    })

    try {
        const dataToSave = await dish.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
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
// add save dish
router.post('/postSaveDish', async (req, res) => {
    const foodId = req.body.food_id;
    const userId = req.body.userId;

    try {
        let save_dish = await Save.findOne({ food_id: foodId, userId: userId });

        if (save_dish) {
            // Nếu đã lưu, xóa bản ghi cũ và tạo mới
            await Save.deleteMany({ food_id: foodId, userId: userId });

        } else {
            // Nếu chưa lưu, tạo bản ghi mới
            save_dish = new Save({
                
                food_id: foodId,
                userId: userId
            });

            await save_dish.save();
        }

        res.status(200).json({ count_save: save_dish.count_save });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
//add Rating
router.post('/postRating', async (req, res) => {
    const rating = new Rating({
        ratings: req.body.ratings,
        food_id: req.body.food_id,
        userId: req.body.userId
    })
    try {
        const dataToSave = await rating.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
// Route để lưu thông tin flow
router.post('/flows', async (req, res) => {
    const user_flow = req.body.user_flow;
    const userId = req.body.userId;

    try {
        // Kiểm tra xem các trường cần thiết đã được cung cấp chưa và có khác nhau hay không
        if (!user_flow || !userId || user_flow === userId) {
            return res.status(400).json({ message: 'Missing required fields or user_flow is the same as userId' });
        }

        const existingFlow = await Flow.findOne({ user_flow: user_flow, userId: userId });

        if (existingFlow) {
            // Nếu flow đã tồn tại, xóa flow đó đi
            await Flow.deleteMany({ user_flow: user_flow, userId: userId });
            res.status(200).json({ message: 'Deleted existing flow' });
        } else {
            // Nếu flow không tồn tại, tạo mới và lưu vào cơ sở dữ liệu
            const newFlow = new Flow({ user_flow, userId });
            await newFlow.save();
            res.status(201).json(newFlow); // Trả về thông tin flow đã lưu thành công
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
////////////////////////////////////////////////////// Delete //////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////// update /////////////////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////// patch /////////////////////////////////////////////////////////////////////////////////////////
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


//update aveRating
router.patch('/updateAveRating/:id', async (req, res) => {
    try {
        const dishId = req.params.id;
        const newAveRating = req.body.aveRating; // Giả sử bạn gửi giá trị aveRating mới từ client

        // Tìm bản ghi Dish cần cập nhật
        const dish = await Dish.findById(dishId);

        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        // Cập nhật giá trị aveRating
        dish.aveRating = newAveRating;

        // Lưu lại bản ghi đã được cập nhật
        const updatedDish = await dish.save();

        res.status(200).json(updatedDish);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});