const express = require("express");
const path = require("path");
const exphdbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");

const app = express();

//Init middleware;
//app.use(logger);

//Handlebar middleware
app.engine("handlebars", exphdbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Bodyparse Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage route
app.get("/", (req, res) => res.render("index", {
    title: "Member App",
    members
}));

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//Members Api routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

