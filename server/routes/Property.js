const { Property } = require('../models/Property');
const upload = require('./image_uploader');
const express = require("express");
const router = express.Router();

/**************************************************************************************************/
// Render add property form
router.get("/new", async (req, res) => {
  res.render("add_property", { errors: [], property: {} });
});

// Render edit property form
router.get("/:id/edit", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).send("Property not found");
    }
    res.render("edit_property", { errors: [], property: property });
  } catch (err) {
    res.status(500).send("An error occurred while fetching the property");
  }
});

/**************************************************************************************************/
// Get all properties
// router.get("/", async (req, res) => {
//   try {
//     const properties = await Property.find().sort("name");
//     res.render("properties", { properties, errors: [] }); // Ensure errors is passed
//   } catch (err) {
//     console.error(err); // Log error for debugging
//     res.status(500).send("An error occurred while fetching properties");
//   }
// });

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


/**************************************************************************************************/
// Get property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).send("The property is not available");
    }
    res.render("view_property", { property, errors: [] }); // Ensure errors is passed
  } catch (err) {
    res.status(500).send("An error occurred while fetching the property");
  }
});

/**************************************************************************************************/
// Adding property
router.post("/", upload.fields([{ name: 'img' }, { name: 'img_author' }]), async (req, res) => {
  if (!req.files['img'] || !req.files['img_author']) {
    return res.status(400).send('Both property image and author image are required.');
  }

  let property = new Property({
    category: req.body.category,
    name: req.body.name,
    location: req.body.location,
    author: req.body.author,
    img_author: {
      path: req.files['img_author'][0].path.replace(/\\/g, '/'), // Normalize path
      contentType: req.files['img_author'][0].mimetype
    },
    BedsNo: req.body.BedsNo,
    BathsNo: req.body.BathsNo,
    sqFt: req.body.sqFt,
    price: req.body.price,
    img: {
      path: req.files['img'][0].path.replace(/\\/g, '/'), // Normalize path
      contentType: req.files['img'][0].mimetype
    },
  });

  try {
    property = await property.save();
    res.status(201).redirect("/properties");
  } catch (error) {
    res.status(500).send('An error occurred while saving the property');
  }
});

/**************************************************************************************************/
// Updating property
router.put("/:id", upload.fields([{ name: 'img' }, { name: 'img_author' }]), async (req, res) => {
  let property = await Property.findById(req.params.id);
  if (!property) return res.status(404).send('The property with the given ID was not found');

  // Prepare the updated data
  const updatedData = {
    category: req.body.category,
    name: req.body.name,
    location: req.body.location,
    author: req.body.author,
    BedsNo: req.body.BedsNo,
    BathsNo: req.body.BathsNo,
    sqFt: req.body.sqFt,
    price: req.body.price,
  };

  if (req.files['img']) {
    updatedData.img = {
      path: req.files['img'][0].path.replace(/\\/g, '/'),
      contentType: req.files['img'][0].mimetype
    };
  }

  if (req.files['img_author']) {
    updatedData.img_author = {
      path: req.files['img_author'][0].path.replace(/\\/g, '/'),
      contentType: req.files['img_author'][0].mimetype
    };
  }

  // Update the property in the database
  try {
    property = await Property.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).send(property);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json(['Failed to update property']);
  }
});

/**************************************************************************************************/
// Deleting property
router.delete("/:id", async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).send("The property is not available");
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send("An error occurred during deletion");
  }
});

module.exports = router;
