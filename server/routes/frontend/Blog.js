const express = require('express');
const { Blog } = require('../../models/Blog');
const router = express.Router();

/**************************************************************************************************/

// Get all Blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find().sort("category");

        const blogsWithFullImgPath = blogs.map(blog => ({
            ...blog._doc,
            img: blog.img ? `http://localhost:5000/${blog.img.path}` : null
        }));

        res.json(blogsWithFullImgPath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching blogs" });
    }
});

  
  module.exports = router;
