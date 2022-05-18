var express = require('express');
var router = express.Router();

//import a js file in json ----
var blogs = require("../public/javascripts/sampleBlogs")


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json('main route');
});


//display sorted list
router.get('/all', function(req, res, next) {
  let sorted = req.query.sort
  //sorted posts below
  blogs.blogPosts.sort((a,b)=> {
    
    if(sorted === 'asc') {
      if(a.createdAt < b.createdAt) {
        return -1
      }
      if(a.createdAt > b.createdAt) {
        return 1
      }
    }
    if(sorted === 'desc') {
      if(a.createdAt < b.createdAt) {
        return -1
      }
      if(a.createdAt > b.createdAt) {
        return 1
      }
    }
    return 0
  })
  // console.log(blogs.blogPosts)
  res.json(blogs.blogPosts);
});

//return story by query
//query parameters "?,=,&" in url
router.get('/:blogId', function(req, res, next) {
  // res.json(blogs.blogPosts);
  let blogId = req.params.blogId
  
  res.json(findBlog(blogId))
});

//helper func for query blog
const findBlog = (blogId) => {
  const foundBlog = blogs.blogPosts.find(ele => ele.id === blogId);
  return foundBlog
}


module.exports = router;


