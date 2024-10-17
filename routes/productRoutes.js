const express = require("express")
const router = express.Router()
const { createProduct, getProducts, addToCart, getCartProducts, addQuantity, subQuantity, removeItem } = require("../controllers/productControllers")
const { protectRoute } = require("../middlewares/protectedRoutes")
const { profile } = require("../controllers/usercontrollers")


router.post("/createProduct", createProduct);
router.get("/getProduct", getProducts);
router.post("/addtocart/:id", protectRoute, addToCart);
router.get("/getcartProducts", protectRoute, getCartProducts);
router.route("/addquantity/:id").post(protectRoute, addQuantity);
router.route("/subquantity/:id").post(protectRoute, subQuantity);
router.route("/remove/:id").post(removeItem);
router.route("/profile").get(protectRoute, profile);


module.exports = router;
