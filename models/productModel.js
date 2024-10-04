const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: {
        data: Buffer,
        contentType: String
    },
    price: String
});


const Products = mongoose.model('products', productSchema);
module.exports = Products