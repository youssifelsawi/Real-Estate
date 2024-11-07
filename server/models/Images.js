const Joi = require("joi");
const mongoose = require("mongoose");

// Images schema
const imagesSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
    },
    city: {
        type: String,
        // required: true,
        minlength: 2,
        maxlength: 100,
    },
    propertyNo: {
        type: String,
        // required: true,
        minlength: 1,
        maxlength: 100,
    },
    img: {
        path: String,
        contentType: String,
    },
});

// Images model
const Images = mongoose.model("Images", imagesSchema);

// Joi validation for Images
function validateImages(images) {
    const schema = Joi.object({
        category: Joi.string().min(3).max(100).required(),
        city: Joi.string().min(2).max(100).optional(), // Make city optional if required is false in schema
        propertyNo: Joi.string().min(1).max(100).optional(), // Make propertyNo optional
        img: Joi.object({
            path: Joi.string().required(), // Validate image path
            contentType: Joi.string().required(), // Validate content type
        }).required(),
    });
    return schema.validate(images, { abortEarly: false });
}

exports.Images = Images;
exports.validateImages = validateImages;
