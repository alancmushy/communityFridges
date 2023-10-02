const express = require("express");
const app = express();

const fridgeRouter = require("./comm-fridge-router.js");
app.use("/fridges", fridgeRouter);



app.use(express.static("./"));


app.get("/", function(req, res, next){
    if(req.accepts('html')) {
          res.sendFile(path.join(__dirname, '/'));
          res.status(200)
    }else{
        res.status(404)
    }
    res.status(500)
  });

app.listen(8000);
console.log("Server running at http://localhost:8000/fridges");
