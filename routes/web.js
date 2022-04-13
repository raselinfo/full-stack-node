const homeController = require("../app/controllers/home/homeController")
const cartController = require("../app/controllers/customers/cart")
const loginController = require("../app/controllers/auth/login")
const registerController = require("../app/controllers/auth/register")
const cartPostController = require("../app/controllers/customers/cartPostController")

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
        method: "get"
    }, {
        path: "/register",
        handler: registerController,
        method: "get"
    },
]



const getWebRoutes = (app) => {
    routes.forEach(({ method, path, handler }) => {
        if (method === "post") {

            app.post(path, handler)
        }
        if (method === "get") {
            app.get(path, handler)

        }
    })
}

module.exports = getWebRoutes