const { Router } = require('express')
const router = Router()
const { authValidation } = require('./validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')


// User model
const User = require('../../models/user')

// @route POST api/auth/register
// @desc Add new User
// @access Public
router.post('/register', async (req, res) => {
    // Validate register req
    const { error } = authValidation(req.body)
    if(error) return res.status(400).send("Validation error: " + error.details[0].message)

    // Checking if user is already in the db
    const loginExist = await User.findOne({login: req.body.login})
    if(loginExist) return res.status(400).send('Login already exists')

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Add new user in database
    const newUser = new User({
        login: req.body.login,
        password: hashedPassword
    })
    try {
        const savedUser = await newUser.save()
        res.send({userId: newUser._id})
    } catch(err) {
        res.status(400).send("Final error: "+ err)
    }
})


// @route POST api/auth/login
// @desc Login User
// @access Public
router.post('/login', async (req, res) => {
    // Validate login req
    const { error } = authValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    // Checking if login exists
    const user = await User.findOne({login: req.body.login})
    if(!user) return res.status(400).send('Login is not found')

    // Check password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid password')

    // Create token
    const token = jwt.sign({ _id: user._id }, config.get("token_secret"))
    res.header('auth-token', token).send({ userId: user._id, token: token})
})


module.exports = router