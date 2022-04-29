const Order = require("../../models/order")

const orderPostController = async (req, res) => {
    const { phone, address } = req.body
    if (!phone || !address) {
        req.flash("error", "All Fields Are Required")
        return res.redirect("/cart")
    }

    const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address,
    })

    try {
        let orderDetails = await order.save()
        if (orderDetails) {
            req.flash("success", "Order Placed")
            return res.redirect("/")
        }
    } catch (err) {
        req.flash("error", "Something went wrong")
        return res.redirect("/cart")
    }

}

module.exports = orderPostController