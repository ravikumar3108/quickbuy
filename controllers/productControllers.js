const Products = require("../models/productModel");
const fs = require('fs')
const Cart = require("../models/cartModel")

const createProduct = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    const newProduct = new Products({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: {
            data: fs.readFileSync('images/' + req.file.filename),
            contentType: 'images/',
        }
    })

    const result = await newProduct.save();
    if (result) {
        res.status(200).json({
            status: true,
            message: "Product added successfully !!",
            product: result
        })
    } else {
        res.status(203).json({
            status: false,
            error: result,
            message: "Failed to add product.",
        })
    }
}

const getProducts = async (req, res) => {

    const allProducts = await Products.find()

    res.status(200).json({
        status: true,
        products: allProducts
    })
}

const addToCart = async (req, res) => {
    try {
        const cartProduct = new Cart({
            item: req.params.id,
            user: req.user._id
        });
        const result = await cartProduct.save();
        res.json({
            status: true,
            result: result
        })
    } catch (err) {
        console.log(err)
    }

}


const getCartProducts = async (req, res) => {
    try {
        let allCartProduct = await Cart.find({ user: req.user._id }).populate("item")
        res.json({
            status: true,
            userProducts: allCartProduct
        })
    } catch (err) {
        res.json({
            status: false,
            message: err,
        })
    }
}



const addQuantity = async (req, res) => {
    console.log(req.params)
    const product = await Cart.findByIdAndUpdate(
        req.params.id,
    );
    product.quantity = parseInt(product.quantity + 1);
    await product.save();
    res.json(product)
}

const subQuantity = async (req, res) => {
    console.log(req.params)
    const product = await Cart.findByIdAndUpdate(
        req.params.id,
    );
    product.quantity = parseInt(product.quantity - 1);
    await product.save();
    console.log(product)
}


const removeItem = async (req, res) => {
    console.log(req.params)
    const product = await Cart.findById(
        req.params.id,
    );
    await product.deleteOne({ _id: req.params.id });
    res.json({
        product: product,
        status: true
    })
}



module.exports = { createProduct, getProducts, addToCart, getCartProducts, addQuantity, subQuantity, removeItem }