const {Multiform} = require("../middleware/Multipart-parser");
let route=require("express").Router();
let {commanAPI,imageUploadAPI}=require("../controller/APIcontrol");
route.post("/uploadimage",Multiform,imageUploadAPI);
route.get("/",commanAPI);
module.exports=route;