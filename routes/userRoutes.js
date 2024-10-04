const express = require("express")
const router = express.Router()
const {login ,Signup} = require("../controllers/usercontrollers")


router.post("/login",login);
router.post("/signup",Signup);

module.exports = router;
