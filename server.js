// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Get Route
app.get("/all", function (request, response) {
    response.send(projectData);
    console.log(projectData);
});

// POST Route
app.post('/add', function (request, response) {
    let newEntry = {
        city: request.body.city,
        temp: request.body.temp,
        date: request.body.date,
        response: request.body.response,
    }
    projectData.push(newEntry);
    response.send(projectData);
    console.log(projectData);
});

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, () => {
    console.log(`Server is up and running on: http://localhost:${port}`);
});