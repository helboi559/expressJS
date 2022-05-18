var express = require('express');
var router = express.Router();

//import a js file in json
var blogs = require("../public/javascripts/sampleBlogs")
// const blogPosts = blogs.blogPosts
// console.log(blogPosts)
// let users = [{name:'Larry'},{name:"juan"}]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json('main route');
});


router.get('/all', function(req, res, next) {
  let sorted = req.query.sort
  //sorted posts below
  // blogs.blogPosts.sort((a,b) => {
  //   if(sorted === 'asc') {
  //     return a.createdAt - b.createdAt
  //   }
  //   if(sorted === 'desc') {
  //     return b.createdAt - a.createdAt
  //   }
  // })
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
  res.json(blogs.blogPosts.map(ele => ele.id));
});

//query parameters "?,=,&" in url
router.get('/:blogId', function(req, res, next) {
  // res.json(blogs.blogPosts);
  let blogId = req.params.blogId
  // let matchBlog = findBlog(blogId)
  // console.log(blogId)
  res.json(findBlog(blogId))
});


const findBlog = (blogId) => {
  const foundBlog = blogs.blogPosts.find(ele => ele.id === blogId);
  return foundBlog
}


module.exports = router;


