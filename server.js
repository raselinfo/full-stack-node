require("dotenv").config()
const express = require("express")
const ejs = require("ejs")
const expressLayout = require("express-ejs-layouts")
const path = require("path")
const passport = require("passport")
const flash = require("express-flash")
const mongoose = require("mongoose")
const session = require("express-session")
const passportInit = require("./app/config/passport")
const MongoStor = require("connect-mongodb-session")(session)
const getWebRoutes = require("./routes/web")
const app = express()
let PORT = process.env.PORT || 4000
let MONGO_URI = process.env.MONGO_URI

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// DataBase connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`mongodb connected :${conn.connection.host}`);
    } catch (error) {
        console.log("hello")
        console.error(`Error:${error.message}`);
        process.exit();
    }
};
connectDB()

const store = new MongoStor({
    uri: MONGO_URI,
    collection: 'sessions',
})

store.on("error", (err) => {
    console.log(err)
})
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store
}))
app.use(flash())

app.use(expressLayout)
app.set("views", path.join(__dirname, "/resources/views"))
app.set("view engine", "ejs")
app.use(express.static("public"))
// Passport
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

getWebRoutes(app)



app.listen(PORT, (err) => {
    if (err) {
        return console.log("Something Went Wrong")
    }
    console.log(`http://localhost:${PORT}`)
})