const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
    name: String
  });

  module.exports = mongoose.model('sample', sampleSchema)
  