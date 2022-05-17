var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/myname',(req,res) => {
  res.send('Juan')
})

let movies = ['spiderman', 'taken', 'show me the money']

router.get('/myfavoritemovies', (req,res) => {
  res.send(`my favorite movies are: ${JSON.stringify(movies)}`)
})
module.exports = router;
