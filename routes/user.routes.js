const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const userModel = require('../models/user.model')
// express validator
const { body, validationResult } = require('express-validator')

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

  async(req, res) => {
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
      const hashPassword = await bcrypt.hash(password, 10);

    const newUser =await userModel.create({
      email,
      username,
      password:hashPassword
    })

    res.json(newUser)
  }
)

module.exports = router
