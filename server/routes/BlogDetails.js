const { BlogDetails } = require('../models/BlogDetails');
const { Blog } = require('../models/Blog');
const upload = require('./image_uploader');
const express = require("express");
const router = express.Router();

/**************************************************************************************************/
// Render add blog detail form
router.get("/new", async (req, res) => {
  const blogs = await Blog.find(); // Fetch all blogs
  res.render("add_blogDetail", { errors: [], blogDetail: {}, blogs });
});

// Render edit blog detail form
router.get("/:id/edit", async (req, res) => {
  try {
    const blogDetail = await BlogDetails.findById(req.params.id).populate('blog');
    const blogs = await Blog.find(); // Fetch all blogs
    if (!blogDetail) {
      return res.status(404).send("Blog detail not found");
    }
    res.render("edit_blogDetail", { errors: [], blogDetail: blogDetail, blogs });
  } catch (err) {
    res.status(500).send("An error occurred while fetching the blog detail");
  }
});

/**************************************************************************************************/
// Get all blog details
router.get("/", async (req, res) => {
  const blogDetails = await BlogDetails.find().populate('blog').sort("date");
  res.render("blogDetails", { blogDetails });
});

/**************************************************************************************************/
// Get blog detail by ID
router.get("/:id", async (req, res) => {
  const blogDetail = await BlogDetails.findById(req.params.id).populate('blog');
  if (!blogDetail) {
    return res.status(404).send("The blog detail is not available");
  }
  res.render("view_blogDetail", { blogDetail });
});

/**************************************************************************************************/
// Adding blog detail
router.post("/", upload.single('img'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('Blog detail image is required..');
  }

  const blogDetailImgPath = req.file.path.replace(/\\/g, '/'); // Normalize backslashes to forward slashes

  let blogDetail = new BlogDetails({
    description1: req.body.description1,
    subTitle: req.body.subTitle,
    description2: req.body.description2,
    date: new Date(),
    img: {
      data: req.file.buffer, // Save the image buffer if you need it
      contentType: req.file.mimetype // Save the image MIME type
    },
    blog: req.body.blogId, // Link to the blog
  });

  try {
    blogDetail = await blogDetail.save();
    res.status(201).redirect("/blogDetails");
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

/**************************************************************************************************/
// Updating blog detail
router.put("/:id", upload.single('img'), async (req, res) => {
  let blogDetail = await BlogDetails.findById(req.params.id);
  if (!blogDetail) return res.status(404).send('The blog detail with the given ID was not found');

  // Prepare the updated data
  const updatedData = {
    description1: req.body.description1,
    subTitle: req.body.subTitle,
    description2: req.body.description2,
    date: new Date(),
    blog: req.body.blogId, // Update the blog reference
  };

  if (req.file) {
    updatedData.img = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    };
  }

  // Update the blog detail in the database
  blogDetail = await BlogDetails.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  res.status(200).send(blogDetail);
});

/**************************************************************************************************/
// Deleting blog detail
router.delete("/:id", async (req, res) => {
  try {
    const blogDetail = await BlogDetails.findByIdAndDelete(req.params.id);
    if (!blogDetail) {
      return res.status(404).send("The blog detail is not available");
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send("An error occurred during deletion");
  }
});

module.exports = router;
