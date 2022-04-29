const homeController = require("../app/controllers/home/homeController")
const cartController = require("../app/controllers/customers/cart")
const loginController = require("../app/controllers/auth/login")
const loginPostController = require("../app/controllers/auth/loginPostController")
const registerController = require("../app/controllers/auth/register")
const cartPostController = require("../app/controllers/customers/cartPostController")
const registerPostController = require("../app/controllers/auth/registerPostController")
const logoutPostController = require("../app/controllers/auth/logoutPostController")
const guest = require("../app/middleware/guest")
const orderPostController = require("../app/controllers/customers/orderPostController")
const orderController = require("../app/controllers/customers/orderController")

let routes = [
    {
        path: "/",
        handler: homeController,
        method: "get"
    }, {
        path: "/cart",
        handler: cartController,
        method: "get"
    }, {
        path: "/updateCart",
        handler: cartPostController,
        method: "post"
    }, {
        path: "/login",
        handler: loginController,
        method: "get",
        mid: guest
    }, {
        path: "/login",
        handler: loginPostController,
        method: "post"
    }, {
        path: "/register",
        handler: registerController,
        method: "get",
        mid: guest
    }, {
        path: "/register",
        handler: registerPostController,
        method: "post"
    }, {
        path: "/logout",
        handler: logoutPostController,
        method: "post"
    }, {
        path: "/order",
        handler: orderPostController,
        method: "post"
    }, {
        path: "/order",
        handler: orderController,
        method: "get"
    }
]



const getWebRoutes = (app) => {
    routes.forEach(({ method, path, handler, mid }) => {
        if (method === "post") {
            if (mid) {
                app.post(path, mid, handler)
            } else {
                app.post(path, handler)
            }
        }
        if (method === "get") {
            if (mid) {
                app.get(path, mid, handler)
            } else {
                app.get(path, handler)
            }

        }
    })
}

module.exports = getWebRoutes