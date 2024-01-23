const bodyParser = require("body-parser");
const express = require("express");

const eventRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});

app.use(authRoutes);

app.use("/posts", eventRoutes);

app.listen(8080, function () {
    console.log("Your app is listening");
});
