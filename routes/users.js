var express = require('express');
var router = express.Router();

let users = [{name:'Larry'},{name:"juan"}]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//query parameters "?,=,&" in url
router.get('/myname',(req,res) => {
  // console.log(req.query)
  let first = req.query.firstname
  let last = req.query.lastname

  res.send(`My name is : ${first} ${last}`)
})

//get back to user and send from 'server" VIA JSON
router.get('/getone/:userNumber', (req,res) => {
  let userNumber = req.params.userNumber
  let foundUser = users[userNumber]
  res.json(foundUser)
})

let movies = ['spiderman', 'taken', 'show me the money']

router.get('/myfavoritemovies', (req,res) => {
  res.send(`my favorite movies are: ${JSON.stringify(movies)}`)
})
module.exports = router;
