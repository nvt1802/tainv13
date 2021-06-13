const express = require("express")
const cors = require("cors")
const app = express()
require("dotenv").config()
const server = require("http").createServer(app)
const passport = require("passport")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const flash = require("connect-flash")
const jwt = require("jsonwebtoken")

const port = process.env.PORT || 3333
const { sequelize } = require("./src/config/database")
require("./src/config/passport")(passport)
require("./src/model")
;(async () => {
  await sequelize.sync()
})()
app.use(cors())
app.use(
  session({
    secret: "tainv13",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
)
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

require("./src/routes")(app, passport)

server.listen(port, console.log(`server runing in port ${port}`))
