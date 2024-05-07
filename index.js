const express = require("express")
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const ejs = require("ejs")
const cookiee = require("cookie-parser")
const session = require("express-session")
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./data/db")

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded())
app.use(cookiee());

app.use(session({
    secret: "test",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: new SequelizeStore({
        db: sequelize,
    })
}))




const AdminRouter = require("./routes/admin.router")
const AuthRouter = require("./routes/auth.router");
const UserRouter = require("./routes/user.router");



app.use("/admin", AdminRouter)
app.use("/user", UserRouter)
app.use("/", AuthRouter)



app.listen(PORT, () => {
    console.log(`server running ${PORT}`)
})