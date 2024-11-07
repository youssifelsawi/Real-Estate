const express = require('express');
const { Property } = require('../../models/Property');
const router = express.Router();

/**************************************************************************************************/
// Get all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find().sort("name");

    const propertiesWithFullImgPath = properties.map(property => ({
      ...property._doc,
      img: property.img ? `http://localhost:5000/${property.img.path}` : null,
      img_author: property.img_author ? `http://localhost:5000/${property.img_author.path}` : null
    }));

    res.json(propertiesWithFullImgPath);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching properties" });
  }
});

module.exports = router;