const express = require("express")
const router = express.Router()
const { createProduct, getProducts, addToCart ,getCartProducts } = require("../controllers/productControllers")
const { protectRoute } = require("../middlewares/protectedRoutes")


router.post("/createProduct", createProduct);
router.get("/getProduct",  getProducts);
router.post("/addtocart/:id", protectRoute, addToCart);
router.get("/getcartProducts", protectRoute, getCartProducts);

module.exports = router;
