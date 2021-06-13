module.exports = (app, passport) => {
  const bcrypt = require("bcrypt-nodejs")
  const uuid = require("uuid")
  const jwt = require("jsonwebtoken")
  const Model = require("../model")

  app.get("/", async (req, res) => {
    Model.Profile.findAll({ include: Model.Person }).then((result) => {
      res.json(result)
    })
  })

  app.get(
    "/test",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      res.send(req.user)
    }
  )

  const getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(" ")
      if (parted.length === 2) {
        return parted[1]
      } else {
        return null
      }
    } else {
      return null
    }
  }

  app.post("/signup", (req, res) => {
    if (!req.body.username || !req.body.password) {
      res.json({ success: false, msg: "Please pass username and password." })
    } else {
      Model.User.findOne({
        where: {
          username: req.body.username,
        },
      }).then((users) => {
        if (users) {
          res.json({ success: false, msg: "Username already exists." })
        } else {
          // Nếu chưa user nào sử dụng username này
          // tạo mới user
          User.create({
            usersId: uuid.v4(),
            username: req.body.username,
            password: bcrypt.hashSync(
              req.body.password,
              bcrypt.genSaltSync(8),
              null
            ),
          }).then((newUser) => {
            if (!newUser) {
              res.json({ success: false, msg: "Username already exists." })
            } else {
              res.json({ success: true, msg: "Successful created new user." })
            }
          })
        }
      })
    }
  })

  // Xử lý thông tin khi có người thực hiện đăng nhập
  app.post("/login", function (req, res) {
    Model.User.findOne({
      where: {
        username: req.body.username,
      },
    }).then((users) => {
      if (!users) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found.",
        })
      } else {
        bcrypt.compare(
          req.body.password,
          users.dataValues.password,
          (err, result) => {
            if (result === true) {
              var token = jwt.sign(
                users.dataValues,
                process.env.ACCESS_TOKEN_SECRET || "tainv13",
                {
                  expiresIn: "3h",
                }
              )
              res.json({ success: true, token: "JWT " + token })
            } else {
              res.status(401).send({
                success: false,
                msg: "Authentication failed. Wrong password.",
              })
            }
          }
        )
      }
    })
  })
}
