const express = require("express")
const router = express.Router()
const { createProduct, getProducts, addToCart, getCartProducts, addQuantity, subQuantity, removeItem } = require("../controllers/productControllers")
const { protectRoute } = require("../middlewares/protectedRoutes")


router.post("/createProduct", createProduct);
router.get("/getProduct", getProducts);
router.post("/addtocart/:id", protectRoute, addToCart);
router.get("/getcartProducts", protectRoute, getCartProducts);
router.route("/addquantity/:id").post(protectRoute, addQuantity);
router.route("/subquantity/:id").post(protectRoute, subQuantity);
router.route("/remove/:id").post(removeItem);


module.exports = router;
