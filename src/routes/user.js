const { createUser ,updateUser, getAllUsers} =require("../controller/user_controller");


const router = require("express").Router();

router.post("/createUser", createUser);
router.patch("/updateUser/:id", updateUser);
router.get("/getAllUsers", getAllUsers);






module.exports = router;