const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    burger : [
        {Bread : Number, Cheese: Number, Paneer:Number, Aloo: Number, id:String},
    ],
    mobile:{
        type: String, 
        required: true
    },
    quantity: String,
    price: String,
    itemStack: Array
},{
    timestamps: true
})

module.exports = mongoose.model("order", orderSchema);