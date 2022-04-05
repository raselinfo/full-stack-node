const homeController = require("../app/controllers/home/homeController")
const cartController = require("../app/controllers/customers/cart")
const loginController = require("../app/controllers/auth/login")
const registerController = require("../app/controllers/auth/register")

let routes = [
    {
        path: "/",
        handler: homeController
    }, {
        path: "/cart",
        handler: cartController
    }, {
        path: "/login",
        handler: loginController
    }, {
        path: "/register",
        handler: registerController
    },
]



const getWebRoutes = (app) => {
    routes.forEach(({ path, handler }) => {
        app.get(path, handler)
    })
}

module.exports = getWebRoutes