const mongoose = require("mongoose");

// Property schema
const propertySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    location: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    img_author: {
        path: String,
        contentType: String,
    },
    BedsNo: {
        type: Number,
        required: true,
    },
    BathsNo: {
        type: Number,
        required: true,
    },
    sqFt: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        path: String,
        contentType: String,
    },
}, { timestamps: true }); // Optional: adds createdAt and updatedAt timestamps

// Property model
const Property = mongoose.model("Property", propertySchema);

// Joi validation schema for property creation
function validateProperty(property) {
    const schema = Joi.object({
        category: Joi.string().required(),
        name: Joi.string().min(5).max(255).required(),
        location: Joi.string().required(),
        author: Joi.string().required(),
        BedsNo: Joi.number().required(),
        BathsNo: Joi.number().required(),
        sqFt: Joi.number().required(),
        price: Joi.number().required(),
        img: Joi.object().optional(),
    });
    return schema.validate(property, { abortEarly: false });
}

exports.Property = Property;
exports.validateProperty = validateProperty;
