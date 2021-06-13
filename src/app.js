const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Younggil Tak",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Younggil Tak",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Help!!".repeat(3),
    title: "Help",
    name: "Younggil Tak",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) return res.send({ error: "No address input given" });

  geocode(address, (error, geoData) => {
    if (error) return res.send({ error });

    const { latitude, longitude, location } = geoData;
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search)
    return res.send({
      error: "You must provide a search item",
    });

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Younggil Tak",
    errorMsg: "Help articles not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Younggil Tak",
    errorMsg: "My 404 Page",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
