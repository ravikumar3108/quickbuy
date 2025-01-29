const express = require("express")
const router = express.Router()
const { createProduct, getProducts, addToCart, getCartProducts, addQuantity, deleteProduct,updateProduct,singleProduct, subQuantity, removeItem } = require("../controllers/productControllers")
const { protectRoute } = require("../middlewares/protectedRoutes")
const { profile } = require("../controllers/usercontrollers")


router.post("/createProduct", createProduct);
router.get("/getProduct", getProducts);
router.post("/singleProduct/:id", singleProduct);
router.post("/addtocart/:id", protectRoute, addToCart);
router.get("/getcartProducts", protectRoute, getCartProducts);
router.route("/addquantity/:id").post(protectRoute, addQuantity);
router.route("/subquantity/:id").post(protectRoute, subQuantity);
router.route("/updateProduct/:id").post(updateProduct);
router.route("/deleteProduct/:id").post(deleteProduct);
router.route("/remove/:id").post(removeItem);
router.route("/profile").get(protectRoute, profile);


module.exports = router;
