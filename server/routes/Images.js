const { Images, validateImages } = require('../models/Images');
const upload = require('./image_uploader');
const express = require("express");
const router = express.Router();

/**************************************************************************************************/
// Render add image form
router.get("/new", (req, res) => {
    res.render("add_image", { errors: [], image: {} });
});

// Render edit image form
router.get("/:id/edit", async (req, res) => {
    try {
        const image = await Images.findById(req.params.id);
        if (!image) {
            return res.status(404).send("Image not found");
        }
        res.render("edit_image", { errors: [], image: image });
    } catch (err) {
        res.status(500).send("An error occurred while fetching the image");
    }
});

/**************************************************************************************************/
// Get all images
// router.get("/", async (req, res) => {
//     try {
//         const images = await Images.find().sort("category");
//         res.render("images", { images }); // Render the images html (ejs)
//     } catch (error) {
//         res.status(500).send("An error occurred while fetching images");
//     }
// });

// Get all images
router.get("/", async (req, res) => {
    try {
        const images = await Images.find().sort("category");

        const imagesWithFullImgPath = images.map(image => ({
            ...image._doc,
            img: image.img ? `http://localhost:5000/${image.img.path}` : null
        }));

        res.json(imagesWithFullImgPath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching images" });
    }
});

/**************************************************************************************************/
// Get image by ID
// router.get("/:id", async (req, res) => {
//     try {
//         const image = await Images.findById(req.params.id);
//         if (!image) {
//             return res.status(404).send("The image is not available");
//         }
//         res.render("view_image", { image });
//     } catch (error) {
//         res.status(500).send("An error occurred while fetching the image");
//     }
// });

// Get image by ID
router.get("/:id", async (req, res) => {
    try {
        const image = await Images.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ error: "The image is not available" });
        }

        const imageWithFullImgPath = {
            ...image._doc,
            img: image.img ? `http://localhost:5000/${image.img.path}` : null
        };

        res.json(imageWithFullImgPath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching the image" });
    }
});

/**************************************************************************************************/
// Adding image
router.post("/", upload.single('img'), async (req, res) => {
    const { error } = validateImages({
        category: req.body.category,
        city: req.body.city,
        propertyNo: req.body.propertyNo,
        img: {
            path: req.file ? req.file.path.replace(/\\/g, '/') : undefined,
            contentType: req.file ? req.file.mimetype : undefined,
        },
    });

    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).render('add_image', { errors: errorMessages, image: req.body });
    }

    if (!req.file) {
        return res.status(400).send('Image is required.');
    }

    const image = new Images({
        category: req.body.category,
        city: req.body.city,
        propertyNo: req.body.propertyNo,
        img: {
            path: req.file.path.replace(/\\/g, '/'),
            contentType: req.file.mimetype
        },
    });

    try {
        await image.save();
        res.status(201).redirect("/images");
    } catch (error) {
        res.status(500).send('An error occurred while saving the image.');
    }
});

/**************************************************************************************************/
// Updating image
router.post("/:id/update", upload.single('img'), async (req, res) => {
    let image = await Images.findById(req.params.id);
    if (!image) return res.status(404).send('The image with the given ID was not found');

    // Validate the image
    const { error } = validateImages({
        category: req.body.category,
        city: req.body.city,
        propertyNo: req.body.propertyNo,
        img: req.file ? {
            path: req.file.path.replace(/\\/g, '/'),
            contentType: req.file.mimetype
        } : image.img // Keep the existing image data if no new file is provided
    });

    if (error) {
        const errorMessages = error.details.map((err) => err.message);
        return res.status(400).render('edit_image', { errors: errorMessages, image: req.body });
    }

    // Prepare the updated data
    const updatedData = {
        category: req.body.category,
        city: req.body.city,
        propertyNo: req.body.propertyNo,
    };

    if (req.file) {
        updatedData.img = {
            path: req.file.path.replace(/\\/g, '/'),
            contentType: req.file.mimetype
        };
    }

    // Update the image in the database
    image = await Images.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).redirect("/images"); // Redirect to the images page after updating
});

/**************************************************************************************************/
// Deleting image
router.delete("/:id", async (req, res) => {
    try {
        const image = await Images.findByIdAndDelete(req.params.id);
        if (!image) {
            return res.status(404).send("The image is not available");
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send("An error occurred during deletion");
    }
});

module.exports = router;
