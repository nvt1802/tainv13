const jwt = require('jsonwebtoken')
const model = require('../model')
const paths = ['/api/admin']

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  const permision =
    req?.method === 'GET'
      ? 1
      : req?.method === 'POST'
      ? 2
      : req?.method === 'PUT'
      ? 3
      : req?.method === 'DELETE'
      ? 4
      : 0

  if (token == null)
    return res.status(401).json({
      succcess: false,
      msg: 'Unauthorized !!!',
    })

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET || 'tainv13',
    async (err, user) => {
      if (err) return res.status(401).json(err)
      if (user.roleId !== 1) return res.sendStatus(403)
      req.user = user
      const result = await model.User.findOne({
        where: { id: user?.id },
        include: model.Permission,
      })
      const listPermision = result?.dataValues?.permissions || []
      if (listPermision?.map((item) => item?.id)?.includes(permision)) {
        next()
      } else {
        return res.sendStatus(403)
      }
    }
  )
}

module.exports = (app) => {
  app.use(
    paths,
    (req, res, next) => {
      next()
    },
    authenticateToken
  )
}
