const personRouter = require("express").Router()
const { body, validationResult, param } = require("express-validator")
const Model = require("../../model")

module.exports = () => {
  // GET
  personRouter.get(async (req, res) => {
    Model.Person.findAll().then((person) => {
      res.json(person)
    })
  })
  // POST
  personRouter.post(
    body("username")
      .notEmpty()
      .withMessage("Username cannot be blank")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    body("points")
      .notEmpty()
      .withMessage("Points cannot be blank")
      .isNumeric()
      .withMessage("is numeric"),
    async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      Model.Person.create({
        username: req.body.username,
        points: req.body.points,
      }).then((result) => {
        res.json({
          success: true,
          msg: "Successful created new person",
          person: result,
        })
      })
    }
  )
  // PUT
  personRouter.put(
    body("personId")
      .notEmpty()
      .withMessage("PersonId cannot be blank")
      .custom((value) => {
        return Model.Person.findOne({
          where: {
            personId: value,
          },
        }).then((person) => {
          if (!person) {
            return Promise.reject("PersonId not found")
          }
        })
      }),
    body("username")
      .notEmpty()
      .withMessage("Username cannot be blank")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    body("points")
      .notEmpty()
      .withMessage("Points cannot be blank")
      .isNumeric()
      .withMessage("is numeric"),
    async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      Model.Person.findOne({
        where: {
          personId: req.body.personId,
        },
      }).then((person) => {
        person.setDataValue("username", req.body.username)
        person.setDataValue("points", req.body.points)
        person.save()
        res.json({
          success: true,
          msg: "Successful updated person",
          person: person,
        })
      })
    }
  )
  // DELETE
  personRouter.delete(
    "/persons/:personId",
    param("personId")
      .notEmpty()
      .withMessage("PersonId cannot be blank")
      .custom((value) => {
        return Model.Person.findOne({
          where: {
            personId: value,
          },
        }).then((person) => {
          if (!person) {
            return Promise.reject("PersonId not found")
          }
        })
      }),
    async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      Model.Person.destroy({
        where: {
          personId: req.params.personId,
        },
      }).then((result) => {
        if (result !== 0) {
          res.json({
            success: true,
            msg: `Successful delete person id = ${req.params.personId}`,
            record: result,
          })
        } else {
          res.json({
            success: false,
            msg: `Can not found person id = ${req.params.personId}`,
            record: result,
          })
        }
      })
    }
  )
  return personRouter
}
