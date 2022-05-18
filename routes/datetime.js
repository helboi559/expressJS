var express = require('express');
let router = express.Router();
//make info into a string
let date = JSON.stringify(Date());
// console.log(typeof date)
router.get('/', (req,res,next) => {
    res.render('datetime',{info: date})
})

module.exports = router;