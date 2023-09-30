const { createClass,getAllConectData,updateClass} =require("../controller/class_controller");


const router = require("express").Router();

router.post("/createClass", createClass);

router.get("/getAllConnectData", getAllConectData);

router.patch("/updateClass/:id", updateClass);







module.exports = router;