const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.port || 8000;

app.use(express.urlencoded());
// app.use(bodyParser);
app.use(express.static("assets"));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/", require("./routes/index"));
app.use(cookieParser());

app.listen(port, function(err){
    if(err){
        console.log(`Error ${err} in running the Server at the port`);
    }
    console.log("Successfully running on port "+port);
});