const passport=require("passport")
const loginPostController = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            req.flash("error", info.message)
            return next(err)
        }
        if (!user) {
            req.flash("error", info.message)
            return res.redirect("/login")
        }
        req.login(user, (err) => {
            if (err) {
                req.flash("error", err.message)
                return next(err)
            }

            return res.redirect("/")
        })
    })(req, res, next)
}

module.exports = loginPostController