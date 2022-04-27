const User = require("../../models/User")
const bcrypt = require("bcrypt")
const registerPostController = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        req.flash("error", "All fields are require!")
        req.flash("name", name)
        req.flash("email", email)
        return res.redirect("/register")
    }
    // Todo: Check if email exist
    try {
        let user = await User.exists({ email: email })
        console.log(user)
        if (user) {
            req.flash("error", "Email Already Exists")
            return res.redirect("/register")
        }
    } catch (err) {
        return res.status(501).json({ message: "Something Went Wrong!" })
    }

    // Todo: Password Hashed
    let hashedPassword
    try {
        hashedPassword = await bcrypt.hash(password, 10)
    } catch (err) {
        return res.status(501).json({ message: "Password Can Not Hashed" })
    }

    // Todo: Save The User in the DB
    try {
        let user = new User({
            name,
            email,
            password: hashedPassword
        })
        await user.save()
        return res.redirect("/")
    } catch (err) {
        req.flash("error", "Something Went Wrong!")
        return res.redirect("/register")
    }



}

module.exports = registerPostController