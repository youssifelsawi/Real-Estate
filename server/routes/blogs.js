const express = require("express");
const { Blog, validateBlog } = require('../models/Blog');
const upload = require('./image_uploader');
const path = require('path');
const router = express.Router();

// Serve static files from the "uploads" directory
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
        res.render("edit_blog", { errors: [], blog });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("An error occurred while fetching the blog");
    }
});

/**************************************************************************************************/
// Get all blogs
// router.get("/", async (req, res) => {
//     try {
//         const blogs = await Blog.find().sort("category");
//         res.render("blogs", { blogs }); // Render the blogs HTML (ejs)
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).send("An error occurred while fetching blogs");
//     }
// });

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

/**************************************************************************************************/
// Get blog by ID
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send("The blog is not available");
        }
        res.render("view_blog", { blog });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send("An error occurred while fetching the blog");
    }
});

/**************************************************************************************************/
// Adding blog
router.post("/", upload.single('img'), async (req, res) => {
    // Validate the blog
    const { error } = validateBlog({
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        imgPath: req.file ? req.file.path.replace(/\\/g, '/') : undefined,
    });

    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).render('add_blog', { errors: errorMessages, blog: req.body });
    }

    if (!req.file) {
        return res.status(400).send('Image is required.');
    }

    const blog = new Blog({
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        img: {
            path: req.file.path.replace(/\\/g, '/'),
            contentType: req.file.mimetype
        },
    });

    try {
        await blog.save();
        res.status(201).redirect("/blogs");
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('An error occurred while saving the blog.');
    }
});

/**************************************************************************************************/
// Updating blog
router.post("/:id", upload.single('img'), async (req, res) => {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send('The blog with the given ID was not found');

    // Validate the blog
    const { error } = validateBlog({
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
        imgPath: req.file ? req.file.path.replace(/\\/g, '/') : blog.img.path // Keep existing image if none uploaded
    });

    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).render('edit_blog', { errors: errorMessages, blog: { ...req.body, img: blog.img } });
    }

    // Prepare the updated data
    const updatedData = {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description,
    };

    // Update image only if a new one is uploaded
    if (req.file) {
        updatedData.img = {
            path: req.file.path.replace(/\\/g, '/'),
            contentType: req.file.mimetype
        };
    }

    try {
        // Update the blog in the database
        blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).redirect(`/blogs/${blog._id}`); // Redirect to the updated blog's view page
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('An error occurred while updating the blog.');
    }
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
        console.error(error); // Log the error for debugging
        res.status(500).send("An error occurred during deletion");
    }
});

module.exports = router;
