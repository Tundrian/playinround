const asyncHandler = require('express-async-handler')
import {Response, Request} from "express"

const Sample = require('../models/sampleModel')

// @desc    Get samples
// @route   GET /api/samples
// @access  Private
const getSamples = asyncHandler(async (req: Request, res: Response) => {
  const samples = await Sample.find()

  res.status(200).json(samples)
})

// @desc Post sample
// @route POST /api/sample/{id}
// @access Private
const postSample = asyncHandler(async (req: Request, res: Response) => {
  console.log('here')
  if(!req.body.name){
    res.status(400)
    throw new Error("Please add a name field")
  }

  const sample = await Sample.create({
    name: req.body.name,
  })

  res.status(200).json(sample)
})

module.exports = {
  getSamples,
  postSample,
}