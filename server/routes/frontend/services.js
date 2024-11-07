const express = require('express');
const { Service } = require('../../models/Service');
const router = express.Router();

/**************************************************************************************************/
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

module.exports = router;
