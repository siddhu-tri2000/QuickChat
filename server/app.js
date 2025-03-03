const express = require('express');
const app = express();
const authRouter = require('./controllers/authControllers')
const userRouter = require('./controllers/userControllers')
// use auth controller router
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

module.exports = app;