const logoutPostController = (req, res, next) => {
    console.log("logout")
    req.logout()
    return res.redirect("/login")
}

module.exports = logoutPostController