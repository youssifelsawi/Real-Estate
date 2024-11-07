const { Blog, handleBlogValidation } = require('../models/Blog');
const upload = require('../image_uploader');
const express = require("express");
const router = express.Router();

/**************************************************************************************************/
// Render add blog form
router.get("/new", (req, res) => {
    res.render("add_blog", { errors: [], blog: {} });
});

// Render edit blog form
router.get("/:id/edit", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send("Blog not found");
        }
        res.render("edit_blog", { errors: [], blog: blog });
    } catch (err) {
        res.status(500).send("An error occurred while fetching the blog");
    }
});

/**************************************************************************************************/
// Get all blogs
router.get("/", async (req, res) => {
    const blogs = await Blog.find().sort("date");
    res.render("blogs", { blogs }); // render the blogs html (ejs)
});

/**************************************************************************************************/
// Get blog by ID
router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return res.status(404).send("The blog is not available");
    }
    res.render("view_blog", { blog });
});

/**************************************************************************************************/
// Adding blog
router.post("/", upload.single('img'), async (req, res) => {
    const { error } = handleBlogValidation(req.body);
    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).render('add_blog', { errors: errorMessages, blog: req.body });
    }

    if (!req.file) {
        return res.status(400).send('Blog image is required..');
    }

    const blogImgPath = req.file.path.replace(/\\/g, '/'); // Normalize backslashes to forward slashes

    let blog = new Blog({
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        date: new Date(),
        img: {
            data: req.file.buffer, // Save the image buffer if needed
            contentType: req.file.mimetype // Save the image MIME type
        }
    });

    try {
        blog = await blog.save();
        res.status(201).redirect("/blogs");
    } catch (error) {
        res.status(500).send('An error occurred');
    }
});

/**************************************************************************************************/
// Updating blog
router.put("/:id", upload.single('img'), async (req, res) => {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('The blog with the given ID was not found');

    // Validate the blog
    const { error } = handleBlogValidation(req.body);
    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).render('edit_blog', { errors: errorMessages, blog: req.body });
    }

    // Prepare the updated data
    const updatedData = {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        date: new Date()
    };

    if (req.file) {
        updatedData.img = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };
    }

    // Update the blog in the database
    blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).send(blog);
});

/**************************************************************************************************/
// Deleting blog
router.delete("/:id", async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).send("The blog is not available");
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send("An error occurred during deletion");
    }
});

module.exports = router;
