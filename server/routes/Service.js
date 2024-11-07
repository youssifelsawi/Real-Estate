const { Service, validateService } = require('../models/Service');
const upload = require('./image_uploader');
const express = require("express");
const router = express.Router();

// Render add service form
router.get("/new", (req, res) => {
    res.render("add_service", { errors: [], service: {} });
});

// Render edit service form
router.get("/:id/edit", async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).send("Service not found");
        }
        res.render("edit_service", { errors: [], service });
    } catch (err) {
        res.status(500).send("An error occurred while fetching the service");
    }
});

// Get all services
// router.get("/", async (req, res) => {
//     try {
//         const services = await Service.find().sort("description");
//         res.render("services", { services });
//     } catch (err) {
//         res.status(500).send("An error occurred while fetching services");
//     }
// });

// Get all services
router.get("/", async (req, res) => {
    try {
        const services = await Service.find().sort("description");

        const servicesWithFullImgPath = services.map(service => ({
            ...service._doc,
            img: service.img ? `http://localhost:5000/${service.img.path}` : null
        }));

        res.json(servicesWithFullImgPath);
    } catch (err) {
        res.status(500).json({ error: "An error occurred while fetching services" });
    }
});

// Get service by ID
router.get("/:id", async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).send("The service is not available");
        }
        res.render("view_service", { service });
    } catch (err) {
        res.status(500).send("An error occurred while fetching the service");
    }
});

// Adding a property
router.post("/", upload.single('img'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('Property image is required.');
    }

    const propertyImgPath = req.file.path.replace(/\\/g, '/'); // Normalize backslashes to forward slashes

    const property = new Property({
        category: req.body.category,
        name: req.body.name,
        location: req.body.location,
        author: req.body.author,
        BedsNo: req.body.BedsNo,
        BathsNo: req.body.BathsNo,
        sqFt: req.body.sqFt,
        price: req.body.price,
        img: {
            path: propertyImgPath, // Save the image path
            contentType: req.file.mimetype // Save the image MIME type
        },
    });

    try {
        await property.save();
        res.status(201).redirect("/properties");
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while saving the property');
    }
});

// Updating a property
router.put("/:id", upload.single('img'), async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).send('The property with the given ID was not found');

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

        if (req.file) {
            updatedData.img = {
                path: req.file.path.replace(/\\/g, '/'), // Save the updated image path
                contentType: req.file.mimetype,
            };
        }

        // Update the property in the database
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).send(updatedProperty);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while updating the property');
    }
});

// Deleting service
router.delete("/:id", async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).send("The service is not available.");
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send("An error occurred during deletion.");
    }
});

module.exports = router;
