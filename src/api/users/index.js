const usersRouter = require('express').Router()
const { Op } = require('sequelize')
const { body, validationResult } = require('express-validator')
const model = require('../../model')
const { getPagination, getPagingData } = require('../../common/pagination')
const moment = require('moment')
const bcrypt = require('bcrypt-nodejs')
const uuid = require('uuid')

const createResponse = (data = []) => {
  return data.map((item) => {
    return {
      id: item?.id,
      email: item?.email,
      createdAt: item?.createdAt,
      updatedAt: item?.updatedAt,
      role: {
        roleId: item?.roleId,
        roleName: item?.roleId === 1 ? 'Admin' : 'User',
      },
    }
  })
}

usersRouter.get('/admin', async (req, res) => {
  const page = req.query?.page || 1
  const size = req.query?.size || 5
  const keyword = req.query?.keyword || ''
  const startDate = req.query?.startDate || '2000-01-01'
  const endDate = req.query?.endDate || '2200-01-01'
  const role = req.query?.role || ''
  const pagination = getPagination(page, size)

  const totalItems = await model.User.findAll({
    where: {
      email: { [Op.like]: `%${keyword}%` },
      roleId: role === '' ? [1, 2] : role,
      createdAt: {
        [Op.between]: [
          moment(startDate).toISOString(),
          moment(endDate).add(1, 'days').toISOString(),
        ],
      },
    },
    include: {
      model: model.Permission,
    },
  }).then((res) => res.length)
  model.User.findAll({
    ...pagination,
    where: {
      email: { [Op.like]: `%${keyword}%` },
      roleId: role === '' ? [1, 2] : role,
      createdAt: {
        [Op.between]: [
          moment(startDate).toISOString(),
          moment(endDate).add(1, 'days').toISOString(),
        ],
      },
    },
    include: {
      model: model.Permission,
    },
    order: [['updatedAt', 'DESC']],
  })
    .then((user) => {
      res.json({
        ...getPagingData(createResponse(user), totalItems, page, size),
        query: {
          keyword,
          startDate,
          endDate,
          role,
        },
      })
    })
    .catch((err) => {
      res.json(err?.name)
    })
})

usersRouter.get('/admin/:id', async (req, res) => {
  model.User.findOne({
    where: {
      id: req.params?.id,
    },
    include: {
      model: model.Permission,
    },
  })
    .then((user) => {
      const response = {
        id: user.id,
        email: user.email,
        roleId: user.roleId,
      }
      res.json(response)
    })
    .catch((err) => {
      res.json(err?.name)
    })
})

usersRouter.post(
  '/admin',
  body('email')
    .notEmpty()
    .withMessage('Email cannot be blank')
    .isEmail()
    .withMessage('Email invalidate')
    .custom((value) => {
      return model.User.findOne({
        where: {
          email: value,
        },
      }).then((user) => {
        if (user) {
          return Promise.reject('E-mail already in use')
        }
      })
    }),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be blank')
    .isLength({ min: 8 })
    .withMessage('Password is too weak'),
  body('permission')
    .isArray()
    .custom((value) => {
      if (!value.every(Number.isInteger))
        return Promise.reject('Permission invalidate')
      return true
    }),
  body('role')
    .notEmpty()
    .withMessage('Role cannot be blank')
    .isNumeric()
    .withMessage('Role invalidate'),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const userId = uuid.v4()
    model.User.create({
      id: userId,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null),
      roleId: req.body.role,
    })
      .then((newUser) => {
        if (!newUser) {
          res.status(400).json({ success: false, msg: 'Email already exists' })
        } else {
          res.json({ success: true, msg: 'Successful created new user' })
        }
      })
      .catch((err) => {
        res.status(400).json({ success: false, msg: err?.original.detail })
      })
  }
)

usersRouter.put(
  '/admin/:id',
  body('permission')
    .isArray()
    .custom((value) => {
      if (!value.every(Number.isInteger))
        return Promise.reject('Permission invalidate')
      return true
    }),
  body('role')
    .notEmpty()
    .withMessage('Role cannot be blank')
    .isNumeric()
    .withMessage('Role invalidate'),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    model.User.findOne({
      where: {
        id: req.params?.id,
      },
    })
      .then(async (user) => {
        if (user.email === process.env.EMAIL_ADMIN) {
          res.sendStatus(403)
        } else {
          user.roleId = req.body?.role || user.roleId
          await user.save()
        }
      })
      .catch((err) => {
        res.json(err?.name)
      })
  }
)

usersRouter.delete('/admin/:id', async (req, res) => {
  model.User.destroy({
    where: {
      id: req.params?.id,
    },
  })
    .then((result) => {
      res.json(result)
    })
    .catch((err) => {
      res.json(err?.name)
    })
})

usersRouter.get('/admin/check/:id', async (req, res) => {
  model.User.findOne({
    where: {
      email: req.params.id || '',
    },
  })
    .then((user) => {
      if (user) {
        res.status(400).json({ success: false, msg: 'E-mail already in use' })
      } else {
        res.status(200).json({ success: true })
      }
    })
    .catch((err) => {
      res.status(200).json({ success: true })
    })
})

module.exports = usersRouter
