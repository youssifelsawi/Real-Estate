const Joi = require("joi"); 
const path = require('path');
Joi.objectId = require("joi-objectId")(Joi);
const cors = require('cors');

const Service = require("./routes/Service");
const Property = require("./routes/Property");
const Images = require("./routes/Images");
const Blog = require("./routes/blogs");

const frontServices = require("./routes/frontend/services");
const frontProperty = require("./routes/frontend/Property");
const frontImages = require("./routes/frontend/Images");
const frontBlog = require("./routes/frontend/Blog");

const express = require("express");
const app = express();
app.use(express.json());

/*****************************************************/
const mongoose = require("mongoose");
mongoose
.connect(
  "mongodb+srv://noureldindeveloper:zjHLZzciiuTnB93c@cluster0.s8icx.mongodb.net/Project?retryWrites=true&w=majority&appName=Cluster0"
)
  .then(() => {
    console.log("connecting to database");
  })
  .catch((err) => {
    console.error("could not connect to database", err);
  });

/*****************************************************/

// built-in middleware function:
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));

app.use(cors());
/**************************************************************************************************/
app.use("/services", Service);
app.use("/Properties", Property);
app.use("/Images", Images);
app.use("/blogs", Blog);
/**************************************************************************************************/

// Serve AdminLTE files
app.use('/adminlte', express.static(path.join(__dirname, 'node_modules', 'admin-lte')));

// Serve Font Awesome from node_modules
app.use('/fontawesome', express.static(path.join(__dirname, 'node_modules', '@fortawesome', 'fontawesome-free')));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Login route
app.get("/login", (req, res) => {
  res.render("login");
});

/**************************************************************************************************/

app.use('/services', frontServices);
app.use('/Properties', frontProperty);
app.use('/Images', frontImages);
app.use('/blogs', frontBlog);


/************************************************************************************************* */
// Environment Variables:
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`your server listening on port ${port}`);
});
// console.log(Service);
