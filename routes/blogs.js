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
      if(a.createdAt > b.createdAt) {
        return -1
      }
      if(a.createdAt < b.createdAt) {
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
router.get('/singleBlog/:blogId', function(req, res, next) {
  // res.json(blogs.blogPosts);
  let blogId = req.params.blogId
  
  res.json(findBlog(blogId))
});
//helper func for query blog
const findBlog = (blogId) => {
  const foundBlog = blogs.blogPosts.find(ele => ele.id === blogId);
  return foundBlog
}
//display where sample input blog of user will start--POST STEP 1
router.get('/postblog', function(req, res, next) {
  res.render('postblog')
});

// console.log(blogs)
//get data and make into a post
router.post('/submit', function (req,res,next) {
   // console.log(JSON.stringify(title))
  const now = new Date()
  let newPost = {
    title:req.body.title,
    text:req.body.text,
    author:req.body.author,
    blogDate:now.toISOString(),
    id:String(blogs.blogPosts.length + 1)
  }
  blogs.blogPosts.push(newPost)
  console.log("new blogs", blogs.blogPosts)
  res.send('successful')
})

//display website
router.get('/displayBlogs', (req,res,next) => {
  res.render('displayBlogs')
})

//display single blog
router.get('/display-single-blog',(req,res,next) => {
  res.render('display-single-blog')
  // console.log(req.body)
})


router.delete('/delete-blog/:blogId', (req,res,next) => {
  //index id of blogpost
  const blogIdToDelete = req.params.blogId
  //call function to return a list w/o the post
  const filterPosts = generateFilteredBlogs(blogs.blogPosts, blogIdToDelete)
  //reassign list to new filtered list
  setBlogposts(filterPosts)
  
  setTimeout(() => {
    res.send('deleted blog')
  }, 5000)
})
//helper function to filter out post by returning list w/o the matching post ID
const generateFilteredBlogs = (blogList, blogIdDelete) => {
  const filteredBlogList = [];
  for(let i = 0 ; i < blogList.length ; i++) {
    if(blogList[i].id === blogIdDelete) {
      continue;
    }
    filteredBlogList.push(blogList[i])
  }
  // console.log(filteredBlogList)
  return filteredBlogList

}

//
const setBlogposts = blogList => {
  blogs.blogPosts = blogList
}
module.exports = router;


