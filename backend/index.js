const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const eventRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");

app.use(authRoutes);

app.use("/posts", eventRoutes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
