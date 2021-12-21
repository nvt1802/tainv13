const uuid = require('uuid')
const questionsRouter = require('express').Router()
const { Op } = require('sequelize')
const { body, validationResult } = require('express-validator')
const model = require('../../model')
const { getPagination, getPagingData } = require('../../common/pagination')

const createResponse = (data = []) => {
  return data.map((item) => {
    return {
      questionId: item?.questionId,
      questionName: item?.questionName,
      optionA: item?.optionA,
      optionB: item?.optionB,
      optionC: item?.optionC,
      optionD: item?.optionD,
      answer: item?.answer,
      exam: item?.exam,
    }
  })
}

questionsRouter.get('/questions', async (req, res) => {
  const page = req.query?.page || 1
  const size = req.query?.size || 5
  const keyword = req.query?.keyword || ''
  const pagination = getPagination(page, size)

  const totalItems = await model.Questions.findAll({
    where: {
      questionName: { [Op.like]: `%${keyword}%` },
    },
    include: {
      model: model.Exams,
    },
  }).then((res) => res.length)
  model.Questions.findAll({
    ...pagination,
    where: {
      questionName: { [Op.like]: `%${keyword}%` },
    },
    include: {
      model: model.Exams,
    },
  })
    .then((question) => {
      res.json({
        ...getPagingData(createResponse(question), totalItems, page, size),
        query: {
          keyword,
        },
      })
    })
    .catch((err) => {
      res.json(err?.name)
    })
})

questionsRouter.get('/questions/:examId', async (req, res) => {
  const examId = req.params?.examId
  const page = req.query?.page || 1
  const size = req.query?.size || 5
  const keyword = req.query?.keyword || ''
  const pagination = getPagination(page, size)

  const totalItems = await model.Questions.findAll({
    where: {
      questionName: { [Op.iLike]: `%${keyword}%` },
    },
    include: {
      model: model.Exams,
      where: {
        id: examId,
      },
    },
  }).then((res) => res.length)
  model.Questions.findAll({
    ...pagination,
    where: {
      questionName: { [Op.iLike]: `%${keyword}%` },
    },
    include: {
      model: model.Exams,
      where: {
        id: examId,
      },
    },
  })
    .then((question) => {
      res.json({
        ...getPagingData(createResponse(question), totalItems, page, size),
        query: {
          keyword,
        },
      })
    })
    .catch((err) => {
      res.json(err?.name)
    })
})

questionsRouter.post('/questions', async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const questionId = uuid.v4()
  model.Questions.create({
    questionId: questionId,
    questionName: req.body.questionName,
    optionA: req.body?.optionA || null,
    optionB: req.body?.optionB || null,
    optionC: req.body?.optionC || null,
    optionD: req.body?.optionD || null,
    answer: req.body?.answer,
    examId: req.body?.examId,
  })
    .then((newQuestion) => {
      res.json({ success: true, msg: 'Successful created new exam' })
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, msg: err?.original?.detail })
    })
})

module.exports = questionsRouter
