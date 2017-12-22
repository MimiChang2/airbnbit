// Dependencies
// =============================================================
var express = require("express");
var Sequelize = require("sequelize");
var bodyParser = require("body-parser");
var payments = require("checkout.js");


var db = require("./models");

var app = express();
var PORT = process.env.PORT || 8080;
var nodeadmin = require("nodeadmin");
app.use(nodeadmin(app));

app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set("view engine", "handlebars");

var homelistingsRoute = require("./controllers/homeListings.js");
app.use("/", homelistingsRoute);

var BookingRoute = require("./controllers/bookingController.js");
app.use("/", BookingRoute);

var userRoute = require("./controllers/userController.js");
app.use("/", userRoute);

app.post('/payments/:id', payments.notification);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
