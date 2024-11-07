const Joi = require("joi");
const mongoose = require("mongoose");

// Service schema
const serviceSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500,
    },
    img: {
        path: String,         // Store the image path if needed
        contentType: String,  // Store the MIME type
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// Service model
const Service = mongoose.model("Service", serviceSchema);

// Joi validation schema for service creation
function validateService(service) {
    const schema = Joi.object({
        description: Joi.string().min(10).max(500).required(),
        // Remove imgPath since we're storing img as an object
    });
    return schema.validate(service, { abortEarly: false });
}

exports.Service = Service;
exports.validateService = validateService;