const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// express validator
const { body, validationResult } = require('express-validator')


// Use cookie-parser middleware
router.use(cookieParser());



// Render the registration form
router.get('/register', (req, res) => {
  res.render('register')
})

// Handle form submission
router.post(
  '/register',
  body('email').trim().isEmail().isLength({ min: 12 }),
  body('password').trim().isLength({ min: 8 }),
  //   body('username').trim().isLength({ min: 3 }),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
        message: errors.message
      })
    }

    // res.send(errors.message);

    // user createing with help of usershcema

    const { email, password, username } = req.body
    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await userModel.create({
      email,
      username,
      password: hashPassword
    })

    res.json(newUser)
  }
)

// login page

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  body('email').trim().isEmail().isLength({ min: 12 }),
  body('password').trim().isLength({ min: 8 }),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
        message: 'invalid Data'
      })
    }
    const { email, password } = req.body
    const user = await userModel.findOne({
      email: email
    })

    // finding the user
    if (!user) {
      return res.status(404).json({
        message: 'email or password is incorrect'
      })
    }

    // password matching validation

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(404).json({
        message: 'email or password is incorrect'
      })
    }





    // if password matches then generate a token with help of JWT after install and require
    // npm install jsonwebtoken and gives a scretKey 

    const token = jwt.sign({
      id: user._id,
      email: user.email,
      user: user.username
    }, process.env.JWT_SECRET_KEY)
    


    // saving token on frountend for keeping login user with heplp of  package-npm install cookie-parser and require it and call it

    res.cookie('token', token)
    res.send('Logged in successfully')
    
    







  }
)

module.exports = router
