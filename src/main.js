require("dotenv").config();
let express = require("express");

let app = express();
let PORT = process.env.PORT || 9005;
let routes = require("./routes");

app.use(express.static("public"));

app.use(express.json());

app.use(routes);

app.listen(PORT, function(){

  console.log("Moodvies app start on port", PORT);
});