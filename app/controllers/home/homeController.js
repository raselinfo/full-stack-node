const Menu = require("../../models/menu")
const homeController = async (req, res, next) => {

    try {
        let menus = await Menu.find()
        res.render('index', { menus: menus })
    } catch (err) {

    }

}

module.exports = homeController