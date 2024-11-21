const express = require('express')
const path = require('path');
const blogs = require('../data/blogs')

const router = express.Router()

router.get('/' , (req , res) =>{
    res.sendFile(path.join(__dirname , '../templates/index.html'))
})

router.get('/blogs', (req, res) => {
    // blogs.blogs.forEach(blog => {
    //     console.log(blog.title); 
    // });
    res.sendFile(path.join(__dirname, "../templates/bloghome.html")); 
});

router.get('/blogpost/:slug', (req, res) => {
    const myBlog = blogs.blogs.filter((e) => {                      
        return e.slug === req.params.slug; // Ensure slug property exists in each blog object
    });
    
    console.log(myBlog);
    
    if (myBlog.length > 0) {
        res.sendFile(path.join(__dirname, '../templates/blogpage.html')); // Send blog page if found
    } else {
        res.status(404).send('Blog post not found'); // Handle missing blog
    }
});


module.exports = router

