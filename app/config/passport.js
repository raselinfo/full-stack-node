const User = require("../models/User")
const bcrypt = require('bcrypt')
const LocalStrategy = require("passport-local").Strategy
function init(passport) {
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        (async (email, password, done) => {
            // Todo: check if user exist
            let user = await User.findOne({ email })
            if (!user) {
                return done(null, false, { message: "no user with this email" })
            }

            let match = await bcrypt.compare(password, user.password)
            if (match) {
                return done(null, user, { message: "Logged in successfully" })
            }else{
                return done(null,false,{message:'wrong user name or password'})
            }
        })
    ))

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}


module.exports = init