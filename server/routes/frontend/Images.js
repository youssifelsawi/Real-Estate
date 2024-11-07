const express = require("express");
const { Images } = require('../../models/Images');
const router = express.Router();

/**************************************************************************************************/
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

module.exports = router;
