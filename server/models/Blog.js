const Joi = require("joi");
const mongoose = require("mongoose");

// Blog schema
const blogSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    img: {
        path: { type: String, required: true },
        contentType: { type: String, required: true },
    },
});

// Blog model
const Blog = mongoose.model("Blog", blogSchema);

// Joi validation for Blog
function validateBlog(blog) {
    const schema = Joi.object({
        category: Joi.string().min(3).max(100).required(),
        title: Joi.string().min(5).max(255).required(),
        description: Joi.string().min(10).required(),
        imgPath: Joi.string().required(),  // Path to the image file
    });
    return schema.validate(blog, { abortEarly: false });
}

exports.Blog = Blog;
exports.validateBlog = validateBlog;
