require("dotenv").config()
const express = require("express")
const ejs = require("ejs")
const expressLayout = require("express-ejs-layouts")
const path = require("path")
const mongoose = require("mongoose")
const session = require("express-session")
const getWebRoutes = require("./routes/web")
const app = express()
let PORT = process.env.PORT || 4000
let MONGO_URI = process.env.MONGO_URI
// DataBase connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`mongodb connected :${conn.connection.host}`);
    } catch (error) {
        console.error(`Error:${error.message}`);
        process.exit();
    }
};
connectDB()
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))
app.use(expressLayout)
app.set("views", path.join(__dirname, "/resources/views"))
app.set("view engine", "ejs")
app.use(express.static("public"))

getWebRoutes(app)



app.listen(PORT, (err) => {
    if (err) {
        return console.log("Something Went Wrong")
    }
    console.log(`http://localhost:${PORT}`)
})