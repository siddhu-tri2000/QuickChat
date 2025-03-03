const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('./../models/user')

//GET details of current logged in user
router.get('/get-logged-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })
        
        res.send({
            message: "User fetched successfully",
            success: true,
            data: user
        })
        
    } catch (error) {
        res.send({
            message: error.message,
            success:false
        })
    }
})

module.exports = router