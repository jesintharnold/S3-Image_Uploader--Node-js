require('dotenv').config({path:"../.env"});
let app=require("express")();
const cors=require("cors");
app.use(cors());
const appRoutes=require("../Back/Routes/RouteConfigs");
app.use("/",appRoutes);
app.listen(8080,()=>{
    console.log("Server started");
});

