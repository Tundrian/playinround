const express = require('express')

const router = express.Router()
const {
  getSamples,
  postSample
} = require('../controllers/sampleController')


router.route('/').get(getSamples).post(postSample)
// router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

module.exports = router