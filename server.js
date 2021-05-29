const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const tweetRoute = require("./routes/tweet");

require("dotenv").config();

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/tweets", tweetRoute);

app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.Promise = global.Promise;
/* mongoose.connect("mongodb://localhost:27017/twitter", { useMongoClient: true }, (err) => {
    if (err) console.error(err);
}); */

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log("Listening on " + port);
});


