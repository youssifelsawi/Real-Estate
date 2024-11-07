// BlogDetails schema
const blogDetailsSchema = new mongoose.Schema({
    description1: {
        type: String,
        required: true,
        minlength: 10,
    },
    subTitle: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    description2: {
        type: String,
        required: true,
        minlength: 10,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    img: {
        data: Buffer,
        contentType: String,
        required: true,
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    }
});

// BlogDetails model
const BlogDetails = mongoose.model("BlogDetails", blogDetailsSchema);

// Joi validation for BlogDetails
function validateBlogDetails(blogDetails) {
    const schema = Joi.object({
        description1: Joi.string().min(10).required(),
        subTitle: Joi.string().min(5).max(255).required(),
        description2: Joi.string().min(10).required(),
        blogId: Joi.objectId().required(),  // Reference to the Blog ID
        imgPath: Joi.string().required(),   // Path to the image file
    });
    return schema.validate(blogDetails, { abortEarly: false });
}

exports.BlogDetails = BlogDetails;
exports.validateBlogDetails = validateBlogDetails;
