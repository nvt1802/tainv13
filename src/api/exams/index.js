const examsRouter = require('express').Router()
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
      examName: item?.examName,
      pointPass: item?.pointPass,
      totalTime: `${item?.hour}:${item?.minute}`,
    }
  })
}

examsRouter.get('/exams', async (req, res) => {
  const page = req.query?.page || 1
  const size = req.query?.size || 5
  const keyword = req.query?.keyword || ''
  const pagination = getPagination(page, size)

  const totalItems = await model.Exams.findAll({
    where: {
      examName: { [Op.like]: `%${keyword}%` },
    },
  }).then((res) => res.length)
  model.Exams.findAll({
    ...pagination,
    where: {
      examName: { [Op.like]: `%${keyword}%` },
    },
  })
    .then((exam) => {
      res.json({
        ...getPagingData(createResponse(exam), totalItems, page, size),
        query: {
          keyword,
        },
      })
    })
    .catch((err) => {
      res.json(err?.name)
    })
})

examsRouter.post('/exams', async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const examId = uuid.v4()
  model.Exams.create({
    id: examId,
    examName: req.body.examName,
    pointPass: req.body.pointPass,
    hour: req.body.hour,
    minute: req.body.minute,
  })
    .then((newExam) => {
      res.json({ success: true, msg: 'Successful created new exam' })
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: err?.original.detail })
    })
})

module.exports = examsRouter
