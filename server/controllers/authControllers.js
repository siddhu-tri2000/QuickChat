const router = require('express').Router();
const User = require('./../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/signup',async (req,res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user)
        {
           return res.send({
                message: "User Already Exists",
                success:false
            })
        }

        const hashedPassword = await bcrypt.hash(req.body.password,10)
        req.body.password = hashedPassword

        const newUser = new User(req.body)
        await newUser.save();

        res.send({
            message: "user created successfully!!",
            success:true
        })

       
    } catch (error) {
        res.send({
            message: error.message,
            success:false
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email})
        if (user) {
            const isValid = await bcrypt.compare(req.body.password, user.password)
            if (isValid) {
                const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" })
                res.send({
                    message: "Logged In",
                    success: true,
                    token:token
                })
            }
            else {
                res.send({
                    message: "Wrong Password",
                    success: false
                })
            }
        }
        else {
            res.send({
                message: "No Login info found",
                success: false
            })
        }
    } catch (error)
    {
        res.send({
            message: error.message,
            success:false
        })
    }
})

module.exports = router