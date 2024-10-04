const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
   {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      quantity:{
         type : Number,
         default : 1
      }
   }
);

module.exports = mongoose.model("carts", cartSchema);