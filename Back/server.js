require('dotenv').config({path:"../.env"});

let app=require("express")();
const cors = require('cors');


const appRoutes=require("../Back/Routes/RouteConfigs");
const bodyParser=require("body-parser");
// app.use(bodyParser.raw());
app.use(cors());
app.use("/",appRoutes);
app.listen(8080,()=>{
    console.log("Server started");
});

