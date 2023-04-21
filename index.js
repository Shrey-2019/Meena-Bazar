const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;



const staticpath = path.join(__dirname, "./public");
const jsPath = path.join(__dirname, "./js");

app.use("/js", express.static(jsPath))
app.use(express.static(staticpath));

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(PORT)
