const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exam = new Schema({});

module.exports = mongoose.model('exam', exam);
