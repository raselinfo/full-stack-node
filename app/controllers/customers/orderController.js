const Order = require("../../models/order")

const orderController = async (req, res) => {
    try {
        const orders = await Order.find({ customerId: req.user._id })
        res.render("customers/orders", { orders })
    } catch (err) {
        req.flash("error", "Something Went Wrong")
        return res.redirect("/")
    }
}

module.exports = orderController