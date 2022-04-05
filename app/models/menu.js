const { Schema, model } = require("mongoose")

const menuSchema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: String, required: true },
    size: { type: String, required: true }
}, { timestamps: true })


let Menu = model("Menu", menuSchema, "menus")

module.exports = Menu