const express = require('express');
const router = express.Router();

// created get route for home page
router.get('/home', (req, res) => { 
    res.render('home');
});

module.exports = router;
    

